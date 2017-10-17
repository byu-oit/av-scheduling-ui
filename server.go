package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"sync"
	"syscall"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
	_, b, _, _ = runtime.Caller(0)
	basepath   = filepath.Dir(b)
)

type jsonobject struct {
	Object ObjectType
}

type ObjectType struct {
	Buffer_size int
	Conf        conf
}

type conf struct {
	clientId           string
	clientSecret       string
	domain             string
	hostname           string
	o365               bool
	oauth_auth_url     string
	oauth_token_url    string
	popupWindowTimeout int
	production         bool
	redirect_url       string
	resource_name      string
	resource_id        string
	showHelpButton     bool
	slack_webhook_url  string
	tenant             string
	timeZone           string
}

func bootstrapEnvironment(wg *sync.WaitGroup) {
	env_dev := basepath + "/web/src/environments/environment.ts"
	env_prd := basepath + "/web/src/environments/environment.prod.ts"

	// Development Server environment
	defaultDev := conf{}
	defaultDev.clientId = os.Getenv("O365_APP_ID")
	defaultDev.clientSecret = os.Getenv("")
	defaultDev.domain = os.Getenv("O365_DOMAIN")
	defaultDev.hostname = os.Getenv("SPANEL_HOSTNAME")
	defaultDev.o365, _ = strconv.ParseBool(os.Getenv("SPANEL_IS_HOSTED_ON_O365"))
	defaultDev.oauth_auth_url = os.Getenv("O365_OAUTH_AUTH_URL")
	defaultDev.oauth_token_url = os.Getenv("O365_OAUTH_TOKEN_URL")
	defaultDev.popupWindowTimeout, _ = strconv.Atoi(os.Getenv("SPANEL_POPUP_TIMEOUT"))
	defaultDev.production = false
	defaultDev.redirect_url = os.Getenv("O365_REDIRECT_URL")
	defaultDev.resource_name = os.Getenv("O365_RESOURCE_NAME")
	defaultDev.resource_id = os.Getenv("O365_RESOURCE_ID")
	defaultDev.showHelpButton, _ = strconv.ParseBool(os.Getenv("SPANEL_SHOW_HELP_BUTTON"))
	defaultDev.slack_webhook_url = os.Getenv("SPANEL_SLACK_WEBHOOK_URL")
	defaultDev.tenant = os.Getenv("O365_TENANT")
	defaultDev.timeZone = os.Getenv("SPANEL_TIMEZONE")

	//Production Angular Server environment
	defaultPrd := conf{}
	defaultPrd.clientId = os.Getenv("O365_APP_ID")
	defaultPrd.clientSecret = os.Getenv("")
	defaultPrd.domain = os.Getenv("O365_DOMAIN")
	defaultPrd.hostname = os.Getenv("SPANEL_HOSTNAME")
	defaultPrd.o365, _ = strconv.ParseBool(os.Getenv("SPANEL_IS_HOSTED_ON_O365"))
	defaultPrd.oauth_auth_url = os.Getenv("O365_OAUTH_AUTH_URL")
	defaultPrd.oauth_token_url = os.Getenv("O365_OAUTH_TOKEN_URL")
	defaultPrd.popupWindowTimeout, _ = strconv.Atoi(os.Getenv("SPANEL_POPUP_TIMEOUT"))
	defaultPrd.production = true
	defaultPrd.redirect_url = os.Getenv("O365_REDIRECT_URL")
	defaultPrd.resource_name = os.Getenv("O365_RESOURCE_NAME")
	defaultPrd.resource_id = os.Getenv("O365_RESOURCE_ID")
	defaultPrd.showHelpButton, _ = strconv.ParseBool(os.Getenv("SPANEL_SHOW_HELP_BUTTON"))
	defaultPrd.slack_webhook_url = os.Getenv("SPANEL_SLACK_WEBHOOK_URL")
	defaultPrd.tenant = os.Getenv("O365_TENANT")
	defaultPrd.timeZone = os.Getenv("SPANEL_TIMEZONE")

	prefix := "export const environment = "
	if _, err_dev := os.Stat(env_dev); os.IsNotExist(err_dev) {
		devData, _ := json.Marshal(defaultDev)
		strDev := prefix + string(devData)
		devFile, errDevFile := os.Create(env_dev)
		if errDevFile != nil {
			log.Fatal(errDevFile)
		}
		defer devFile.Close()
		_, devWriteErr := io.Copy(devFile, strings.NewReader(strDev))
		if devWriteErr != nil {
			log.Fatal(devWriteErr)
		}
	}

	if _, err_prd := os.Stat(env_prd); os.IsNotExist(err_prd) {
		prdData, _ := json.Marshal(defaultPrd)
		strPrd := prefix + string(prdData)
		prdFile, errPrdFile := os.Create(env_prd)
		if errPrdFile != nil {
			log.Fatal(errPrdFile)
		}
		defer prdFile.Close()
		_, prdWriteErr := io.Copy(prdFile, strings.NewReader(strPrd))
		if prdWriteErr != nil {
			log.Fatal(prdWriteErr)
		}
	}

	wg.Done() // Need to signal to waitgroup that this goroutine is done
}

func startAngular(wg *sync.WaitGroup) {

	npm, lookErr := exec.LookPath("npm")
	if lookErr != nil {
		panic(lookErr)
	}
	isProd, envVarErr := strconv.ParseBool(os.Getenv("SPANEL_IS_PRODUCTION"))
	if envVarErr != nil {
		os.Setenv("NODE_ENV", "development")
	}
	if isProd {
		os.Setenv("NODE_ENV", "production")
	} else {
		os.Setenv("NODE_ENV", "development")
	}

	args_npm := []string{"npm", "start"}
	env := os.Environ()
	syscall.Chdir("web")
	npm_execErr := syscall.Exec(npm, args_npm, env)

	if npm_execErr != nil {
		log.Fatal(npm_execErr)
	}

	wg.Done() // Need to signal to waitgroup that this goroutine is done
}

func main() {
	wg := new(sync.WaitGroup)
	wg.Add(1)

	go bootstrapEnvironment(wg)
	//go startAngular(wg)

	port := ":8012"

	router := echo.New()
	router.Pre(middleware.RemoveTrailingSlash())
	router.Use(middleware.CORS())

	// Use the `secure` routing group to require authentication
	//secure := router.Group("", echo.WrapMiddleware(authmiddleware.Authenticate))

	router.Static("/*", "public")

	/*TARGET_URL, err := url.Parse(ANGULAR)
	if err != nil {
		router.Logger.Fatal(err)
	}

	/*outer.Use(middleware.Proxy(&middleware.RoundRobinBalancer{
		Targets: []*middleware.ProxyTarget{
			&middleware.ProxyTarget{
				URL: TARGET_URL,
			},
		},
	}))*/

	server := http.Server{
		Addr:           port,
		MaxHeaderBytes: 1024 * 10,
	}

	router.StartServer(&server)

}
