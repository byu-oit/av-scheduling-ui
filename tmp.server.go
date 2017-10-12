package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"sync"
	"syscall"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type Config struct {
	Hostname  string
	IPAddress string
	Room      string
	Building  string
}

const CONFIGDIR string = "web/src/app"
const CONFIGFILE string = "config.json"

func check(e error) {
	if e != nil {
		panic(e)
	}
}
func getIP() (string, error) {
	ifaces, err := net.Interfaces()
	if err != nil {
		return "", err
	}
	for _, iface := range ifaces {
		if iface.Flags&net.FlagUp == 0 {
			continue // interface down
		}
		if iface.Flags&net.FlagLoopback != 0 {
			continue // loopback interface
		}
		addrs, err := iface.Addrs()
		if err != nil {
			return "", err
		}
		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}
			if ip == nil || ip.IsLoopback() {
				continue
			}
			ip = ip.To4()
			if ip == nil {
				continue // not an ipv4 address
			}
			return ip.String(), nil
		}
	}
	return "", errors.New("are you connected to the network?")
}

func parseBuildingAndRoomFromHostname(in string, sep string) (string, string) {
	subs := strings.Split(in, sep)

	//Assume format BBBB-RRRRR-...
	if len(subs) < 2 {
		log.Println("String did not match expected format")
		return "", ""
	}

	return subs[0], subs[1]
}

func populateConfigData(wg *sync.WaitGroup) {
	filePath := CONFIGDIR + "/" + CONFIGFILE
	// Check for file
	/*f, err := os.Create(filePath)
	check(err)

	defer f.Close()

	if err != nil {
		log.Fatal("Could not write application configuration data")
	}*/

	var conf Config
	h, err := os.Hostname()
	if err != nil {
		log.Fatal("Could not read hostname.")
	}
	if strings.Contains(h, "-") {
		conf.Building = ""
		conf.Room = ""
	} else {
		bld, room := parseBuildingAndRoomFromHostname("itb-1109-sp1", "-")
		conf.Building = bld
		conf.Room = room
	}

	conf.Hostname = h

	ip, ipFetchErr := getIP()

	if ipFetchErr != nil {
		//fmt.Println(ipFetchErr)
		conf.IPAddress = ""
	}
	conf.IPAddress = ip

	configJson, _ := json.Marshal(conf)
	err = ioutil.WriteFile(filePath, configJson, 0644)

	wg.Done() // Signal to waitgroup that this goroutine is done
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

func main() {
	wg := new(sync.WaitGroup)
	wg.Add(2)

	go populateConfigData(wg)

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
