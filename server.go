package main

import (
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"sync"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func startAngular(wg *sync.WaitGroup) {
	//This really doesn't work, but I need to get the docker image tested
	cmd := exec.Command("npm install && npm start", os.Getenv("PATH"))
	cmd.Dir = "$GOPATH/src/github.com/byu-oit/av-scheduling-ui/web"
	err := cmd.Start()
	if err != nil {
		log.Fatal(err)
	}
	wg.Done() // Need to signal to waitgroup that this goroutine is done
}

func main() {
	wg := new(sync.WaitGroup)
	wg.Add(1)

	//go startAngular(wg)

	port := ":8011"
	const ANGULAR string = "http://localhost:4200"

	router := echo.New()
	router.Pre(middleware.RemoveTrailingSlash())
	router.Use(middleware.CORS())

	// Use the `secure` routing group to require authentication
	//secure := router.Group("", echo.WrapMiddleware(authmiddleware.Authenticate))

	router.Static("/*", "public")

	TARGET_URL, err := url.Parse(ANGULAR)
	if err != nil {
		router.Logger.Fatal(err)
	}

	router.Use(middleware.Proxy(&middleware.RoundRobinBalancer{
		Targets: []*middleware.ProxyTarget{
			&middleware.ProxyTarget{
				URL: TARGET_URL,
			},
		},
	}))

	server := http.Server{
		Addr:           port,
		MaxHeaderBytes: 1024 * 10,
	}

	router.StartServer(&server)

}
