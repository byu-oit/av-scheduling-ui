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

func main() {
	wg := new(sync.WaitGroup)
	wg.Add(1)

	go startAngular(wg)

	// The web ui is served on 8011, the service layer on 8012
	port := ":8012"

	router := echo.New()
	router.Pre(middleware.RemoveTrailingSlash())
	router.Use(middleware.CORS())

	router.Static("/*", "public")

	server := http.Server{
		Addr:           port,
		MaxHeaderBytes: 1024 * 10,
	}

	router.StartServer(&server)

}
