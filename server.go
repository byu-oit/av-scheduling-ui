package main

import (
	"log"
	"net/http"
	"os"
	"os/exec"
	"sync"
	"syscall"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func startAngular(wg *sync.WaitGroup) {
	/*ng, lookErr := exec.LookPath("ng")
	if lookErr != nil {
		panic(lookErr)
	}*/

	npm, lookErr := exec.LookPath("npm")
	if lookErr != nil {
		panic(lookErr)
	}

	//args_ng := []string{"ng", "serve", "--port=8011"}
	args_npm := []string{"npm", "start"}
	env := os.Environ()
	syscall.Chdir("web")
	npm_execErr := syscall.Exec(npm, args_npm, env)

	if npm_execErr != nil {
		log.Fatal(npm_execErr)
	}
	/*ng_execErr := syscall.Exec(ng, args_ng, env)
	if ng_execErr != nil {
		panic(ng_execErr)
	}*/
	wg.Done() // Need to signal to waitgroup that this goroutine is done
}

func main() {
	wg := new(sync.WaitGroup)
	wg.Add(1)

	go startAngular(wg)

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
