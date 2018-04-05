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

func buildAngular(wg *sync.WaitGroup) {

	wg.Done()
}

func bootstrapEnvironment(wg *sync.WaitGroup) {
	envDev := basepath + "/web/src/environments/environment.ts"
	envPrd := basepath + "/web/src/environments/environment.prod.ts"
	// Development Server environment
	prefix := "export const environment = {"

	devStrings := []string{
		prefix,
		"allow_book_now_function: ", os.Getenv("SPANEL_ALLOW_BOOK_NOW"), ",",
		"clientId: '", os.Getenv("O365_APP_ID"), "',",
		"clientSecret: '", os.Getenv("O365_CLIENT_SECRET"), "',",
		"debug: ", os.Getenv("SPANEL_DEBUG"), "',",
		"domain: '", os.Getenv("O365_DOMAIN"), "',",
		"exchange_username: '", os.Getenv("EXCHANGE_PROXY_USERNAME"), "',",
		"exchange_password: '", os.Getenv("EXCHANGE_PROXY_PASSWORD"), "',",
		"hostIP: '", os.Getenv("HOST_IP"), "',",
		"hostname: '", os.Getenv("SPANEL_HOSTNAME"), "',",
		"o365: ", os.Getenv("SPANEL_IS_HOSTED_ON_O365"), ",",
		"oauth_auth_url: '", os.Getenv("O365_OAUTH_AUTH_URL"), "',",
		"oauth_token_url: '", os.Getenv("O365_OAUTH_TOKEN_URL"), "',",
		"popupWindowTimeout: ", os.Getenv("SPANEL_POPUP_TIMEOUT"), ",",
		"production: ", "false,",
		"redirect_url: '", os.Getenv("O365_REDIRECT_URL"), "',",
		"resource_name: '", os.Getenv("O365_RESOURCE_NAME"), "',",
		"resource_id: '", os.Getenv("O365_RESOURCE_ID"), "',",
		"showHelpButton: ", os.Getenv("SPANEL_SHOW_HELP_BUTTON"), ",",
		"slack_webhook_url: '", os.Getenv("SPANEL_SLACK_WEBHOOK_URL"), "',",
		"tenant: '", os.Getenv("O365_TENANT"), "',",
		"timeZone: '", os.Getenv("SPANEL_TIMEZONE"), "',",
		"time_slot_size: ", os.Getenv("SPANEL_TIMESLOT_SIZE"), ",",
		"workDayEndHour: ", os.Getenv("SPANEL_WORKDAY_START"), ",",
		"workDayStartHour: ", os.Getenv("SPANEL_WORKDAY_END"),
		"'};"}
	prdStrings := []string{
		prefix,
		"allow_book_now_function: ", os.Getenv("SPANEL_ALLOW_BOOK_NOW"), ",",
		"clientId: '", os.Getenv("O365_APP_ID"), "',",
		"clientSecret: '", os.Getenv("O365_CLIENT_SECRET"), "',",
		"debug: ", os.Getenv("SPANEL_DEBUG"), "',",
		"domain: '", os.Getenv("O365_DOMAIN"), "',",
		"exchange_username: '", os.Getenv("EXCHANGE_PROXY_USERNAME"), "',",
		"exchange_password: '", os.Getenv("EXCHANGE_PROXY_PASSWORD"), "',",
		"hostIP: '", os.Getenv("HOST_IP"), "',",
		"hostname: '", os.Getenv("SPANEL_HOSTNAME"), "',",
		"o365: ", os.Getenv("SPANEL_IS_HOSTED_ON_O365"), ",",
		"oauth_auth_url: '", os.Getenv("O365_OAUTH_AUTH_URL"), "',",
		"oauth_token_url: '", os.Getenv("O365_OAUTH_TOKEN_URL"), "',",
		"popupWindowTimeout: ", os.Getenv("SPANEL_POPUP_TIMEOUT"), ",",
		"production: ", "true,",
		"redirect_url: '", os.Getenv("O365_REDIRECT_URL"), "',",
		"resource_name: '", os.Getenv("O365_RESOURCE_NAME"), "',",
		"resource_id: '", os.Getenv("O365_RESOURCE_ID"), "',",
		"showHelpButton: ", os.Getenv("SPANEL_SHOW_HELP_BUTTON"), ",",
		"slack_webhook_url: '", os.Getenv("SPANEL_SLACK_WEBHOOK_URL"), "',",
		"tenant: '", os.Getenv("O365_TENANT"), "',",
		"timeZone: '", os.Getenv("SPANEL_TIMEZONE"), "',",
		"time_slot_size: ", os.Getenv("SPANEL_TIMESLOT_SIZE"), ",",
		"workDayEndHour: ", os.Getenv("SPANEL_WORKDAY_START"), ",",
		"workDayStartHour: ", os.Getenv("SPANEL_WORKDAY_END"),
		"'};"}
	devLines := strings.Join(devStrings, "")
	prdLines := strings.Join(prdStrings, "")
	//log.Println(devLines)

	if _, errDev := os.Stat(envDev); os.IsNotExist(errDev) {
		errDevFileRemove := os.Remove(envDev)

		if errDevFileRemove != nil {
			log.Fatal("Cowardly refusing to go on - environment file was not changed")
			return
		}

		devFile, errDevFile := os.Create(envDev)
		if errDevFile != nil {
			log.Fatal(errDevFile.Error())
		}
		if _, errDevFile = io.WriteString(devFile, devLines); errDevFile != nil {
			devFile.Close()
			log.Fatal(errDevFile.Error())
		}
		devFile.Close()
	}

	if _, errPrd := os.Stat(envPrd); os.IsNotExist(errPrd) {
		errPrdFileRemove := os.Remove(envPrd)

		if errPrdFileRemove != nil {
			log.Fatal("Cowardly refusing to go on - prod environment file was not changed")
			return
		}

		prdFile, errPrdFile := os.Create(envPrd)
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
	//go startAngular(wg)
	go buildAngular(wg)

	port := ":8011"

	router := echo.New()
	router.Pre(middleware.RemoveTrailingSlash())
	router.Use(middleware.CORS())

	router.Static("/*", "public")

	// server := http.Server{
	// 	Addr:           port,
	// 	MaxHeaderBytes: 1024 * 10,
	// }

	fs := http.FileServer(http.Dir("web/dist"))
	http.Handle("/", fs)

	// router.StartServer(&server)
	http.ListenAndServe(port, nil)

}
