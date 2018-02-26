package main

import (
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

func bootstrapEnvironment(wg *sync.WaitGroup) {
	env_dev := basepath + "/web/src/environments/environment.ts"
	env_prd := basepath + "/web/src/environments/environment.prod.ts"
	// Development Server environment
	prefix := "export const environment = {"

	devStrings := []string{prefix, "clientId: '", os.Getenv("O365_APP_ID"), "',", "clientSecret: '", os.Getenv("O365_CLIENT_SECRET"), "',", "domain: '", os.Getenv("O365_DOMAIN"), "',", "exchange_username: '", os.Getenv("EXCHANGE_PROXY_USERNAME"), "',", "exchange_password: '", os.Getenv("EXCHANGE_PROXY_PASSWORD"), "',", "hostname: '", os.Getenv("SPANEL_HOSTNAME"), "',", "o365: ", os.Getenv("SPANEL_IS_HOSTED_ON_O365"), ",", "oauth_auth_url: '", os.Getenv("O365_OAUTH_AUTH_URL"), "',", "oauth_token_url: '", os.Getenv("O365_OAUTH_TOKEN_URL"), "',", "popupWindowTimeout: ", os.Getenv("SPANEL_POPUP_TIMEOUT"), ",", "production: ", "false,", "redirect_url: '", os.Getenv("O365_REDIRECT_URL"), "',", "resource_name: '", os.Getenv("O365_RESOURCE_NAME"), "',", "resource_id: '", os.Getenv("O365_RESOURCE_ID"), "',", "showHelpButton: ", os.Getenv("SPANEL_SHOW_HELP_BUTTON"), ",", "slack_webhook_url: '", os.Getenv("SPANEL_SLACK_WEBHOOK_URL"), "',", "tenant: '", os.Getenv("O365_TENANT"), "',", "timeZone: '", os.Getenv("SPANEL_TIMEZONE"), "'};"}
	prdStrings := []string{prefix, "clientId: '", os.Getenv("O365_APP_ID"), "',", "clientSecret: '", os.Getenv("O365_CLIENT_SECRET"), "',", "domain: '", os.Getenv("O365_DOMAIN"), "',", "exchange_username: '", os.Getenv("EXCHANGE_PROXY_USERNAME"), "',", "exchange_password: '", os.Getenv("EXCHANGE_PROXY_PASSWORD"), "',", "hostname: '", os.Getenv("SPANEL_HOSTNAME"), "',", "o365: ", os.Getenv("SPANEL_IS_HOSTED_ON_O365"), ",", "oauth_auth_url: '", os.Getenv("O365_OAUTH_AUTH_URL"), "',", "oauth_token_url: '", os.Getenv("O365_OAUTH_TOKEN_URL"), "',", "popupWindowTimeout: ", os.Getenv("SPANEL_POPUP_TIMEOUT"), ",", "production: ", "true,", "redirect_url: '", os.Getenv("O365_REDIRECT_URL"), "',", "resource_name: '", os.Getenv("O365_RESOURCE_NAME"), "',", "resource_id: '", os.Getenv("O365_RESOURCE_ID"), "',", "showHelpButton: ", os.Getenv("SPANEL_SHOW_HELP_BUTTON"), ",", "slack_webhook_url: '", os.Getenv("SPANEL_SLACK_WEBHOOK_URL"), "',", "tenant: '", os.Getenv("O365_TENANT"), "',", "timeZone: '", os.Getenv("SPANEL_TIMEZONE"), "'};"}
	devLines := strings.Join(devStrings, "")
	prdLines := strings.Join(prdStrings, "")
	//log.Println(devLines)

	if _, err_dev := os.Stat(env_dev); os.IsNotExist(err_dev) {
		devFile, errDevFile := os.Create(env_dev)
		if errDevFile != nil {
			log.Fatal(errDevFile.Error())
		}
		if _, errDevFile = io.WriteString(devFile, devLines); errDevFile != nil {
			devFile.Close()
			log.Fatal(errDevFile.Error())
		}
		devFile.Close()
	}

	if _, err_prd := os.Stat(env_prd); os.IsNotExist(err_prd) {
		prdFile, errPrdFile := os.Create(env_prd)
		if errPrdFile != nil {
			log.Fatal(errPrdFile.Error())
		}
		if _, errPrdFile = io.WriteString(prdFile, prdLines); errPrdFile != nil {
			prdFile.Close()
			log.Fatal(errPrdFile.Error())
		}
		prdFile.Close()
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
	wg.Add(2)

	go bootstrapEnvironment(wg)
//	go startAngular(wg)

	port := ":8011"

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

/*	server := http.Server{
		Addr:           port,
		MaxHeaderBytes: 1024 * 10,
	}*/
	fs := http.FileServer(http.Dir("web/dist"))
	http.Handle("/", fs)

//	router.StartServer(&server)
	http.ListenAndServe(port, nil)

}
