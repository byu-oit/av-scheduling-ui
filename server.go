package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"strconv"
	"sync"
	"syscall"

	//"github.com/labstack/echo"
	//"github.com/labstack/echo/middleware"

	"golang.org/x/oauth2"
)

var (
	code  = ""
	token = ""
)
var client_id = os.Getenv("O365_APP_ID")
var clientSecret = os.Getenv("O365_CLIENT_SECRET")
var scope = "Calendars.Read%20Calendars.Read.Shared%20Calendars.ReadWrite.Shared"
var redirect_uri = os.Getenv("O365_REDIRECT_URL")
var tokenURL = os.Getenv("O365_OAUTH_TOKEN_URL")
var authURL = os.Getenv("O365_OAUTH_AUTH_URL")

type APIConfig struct {
	conf         oauth2.Config
	initialToken *oauth2.Token
	code         string
}

type DefaultCredentials struct {
	ClientID     string
	ClientSecret string
	RedirectURL  string
	Scopes       []string
	Endpoint     oauth2.Endpoint
	ProjectID    string // may be empty
	TokenSource  oauth2.TokenSource
	code         string

	// JSON contains the raw bytes from a JSON credentials file.
	// This field may be nil if authentication is provided by the
	// environment and not with a credentials file
	JSON []byte
}

var clientConf = oauth2.Config{
	ClientID:     client_id,
	ClientSecret: clientSecret,
	RedirectURL:  redirect_uri,
	Scopes:       []string{"Calendars.Read", "Calendars.Read.Shared", "Calendars.ReadWrite.Shared", "Contacts.Read", "Mail.Read", "Mail.Send", "User.Read"},
	Endpoint: oauth2.Endpoint{
		AuthURL:  authURL,
		TokenURL: tokenURL,
	},
}

func startAngular(wg *sync.WaitGroup) {
	npm, lookErr := exec.LookPath("npm")
	if lookErr != nil {
		panic(lookErr)
	}

	args_npm := []string{"npm", "start"}
	env := os.Environ()
	syscall.Chdir("web")
	npm_execErr := syscall.Exec(npm, args_npm, env)

	if npm_execErr != nil {
		log.Fatal(npm_execErr)
	}

	wg.Done() // Signal to waitgroup that this goroutine is done
}

// Copy the src file to dst. Any existing file will be overwritten and will not
// copy file attributes.
func Copy(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()

	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, in)
	if err != nil {
		return err
	}
	return out.Close()
}

func copyConfigFileToAngular(wg *sync.WaitGroup) {
	/*cp, lookErr := exec.LookPath("cp")
	if lookErr != nil {
		panic(lookErr)
	}

	cpy_args := []string{"cp", "-fr", "config.json", "./web/src/app/config.json"}
	env := os.Environ()

	err := syscall.Exec(cp, cpy_args, env)
	if err != nil {
		log.Fatal(err)
	}*/
	Copy("config.json", "web/src/app/config.json")
	wg.Done() // Signal to waitgroup that this goroutine is done
}

func GetDefaultCredentials(ctx context.Context, scope ...string) (*DefaultCredentials, error) {

	ep := oauth2.Endpoint{
		AuthURL:  authURL,
		TokenURL: tokenURL,
	}
	return &DefaultCredentials{
		ClientID:     client_id,
		ClientSecret: clientSecret,
		RedirectURL:  redirect_uri,
		Scopes:       []string{"Calendars.Read", "Calendars.Read.Shared", "Calendars.ReadWrite.Shared", "Contacts.Read", "Mail.Read", "Mail.Send", "User.Read"},
		Endpoint:     ep,
		code:         "tmpCode",
	}, nil
}

func DefaultTokenSource(ctx context.Context, scope ...string) (oauth2.TokenSource, error) {
	creds, err := GetDefaultCredentials(ctx, scope...)
	if err != nil {
		return nil, err
	}

	return creds.TokenSource, nil
}

func NewHTTPClient(ctx context.Context, scope ...string) (*http.Client, error) {
	ts, err := DefaultTokenSource(ctx, scope...)
	if err != nil {
		return nil, err
	}
	return oauth2.NewClient(ctx, ts), nil
}

func (c *APIConfig) TokenSource(ctx context.Context) oauth2.TokenSource {
	return c.conf.TokenSource(ctx, c.initialToken)
}

func handleAuthorize(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Got to handleAuthorize")
	//url := clientConf.Endpoint.AuthURL

	client, err := NewHTTPClient(oauth2.NoContext, clientConf.Endpoint.AuthURL)
	if err != nil {
		log.Fatal(err)
	}
	data := url.Values{}
	data.Add("grant_type", "authorization_code")
	data.Add("client_secret", clientSecret)
	data.Add("client_id", client_id)
	data.Add("redirect_uri", redirect_uri)
	data.Add("scope", "Calendars.ReadWrite.Shared")
	//data.Add("code", "tmp")

	req, _ := http.NewRequest("POST", clientConf.Endpoint.AuthURL, bytes.NewBufferString(data.Encode()))
	req.Header.Add("Authorization", "Bearer "+code)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Content-Length", strconv.Itoa(len(data.Encode())))

	resp, postErr := client.Do(req)
	//resp, getErr := client.Get(url)
	if postErr != nil {
		log.Fatal(postErr)
	}
	defer resp.Body.Close()
	if resp.StatusCode == 200 { // OK
		bodyBytes, _ := ioutil.ReadAll(resp.Body)
		bodyString := string(bodyBytes)

		fmt.Println(bodyString)
	}

	bodyBytes, _ := ioutil.ReadAll(resp.Body)
	bodyString := string(bodyBytes)

	fmt.Println(bodyString)

	//redirect user to that page
	http.Redirect(w, r, clientConf.Endpoint.TokenURL, http.StatusFound)
}

func handleOAuth2Callback(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Got to handleOauth2Callback")
	//Get the code from the response
	code := r.FormValue("code")

	//t := &oauth.Transport{}

	// Exchange the received code for a token
	//t.Exchange(code)
	fmt.Println(code)

}

func main() {
	wg := new(sync.WaitGroup)
	wg.Add(2)

	//go copyConfigFileToAngular(wg)

	//go startAngular(wg)
	//getEvents()

	// The web ui is served on 8011, the service layer on 8012
	port := ":8011"
	//http.HandleFunc("/*", public)
	http.HandleFunc("/events", handleAuthorize)
	http.HandleFunc("/oauth_login_cb", handleOAuth2Callback)

	http.ListenAndServe(port, nil)

}
