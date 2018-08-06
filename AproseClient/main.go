package main

import (
	"bytes"
	"flag"
	"log"
	"net/http"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/clientcredentials"
)

var serverRoot string
var appKey string
var appSecret string
var tokenUrl string

var usersUrl string
var exampleUrl string

var client *http.Client

var clientService ClientService

func init() {
	flag.StringVar(&serverRoot, "serverRoot", "", "The base URL")
	flag.StringVar(&appKey, "appKey", "", "The Application Key")
	flag.StringVar(&appSecret, "appSecret", "", "The Application Secret")

	flag.Parse()

	if serverRoot == "" || appKey == "" || appSecret == "" {
		flag.Usage()
		os.Exit(1)
	}

	tokenUrl = serverRoot + ""
	usersUrl = serverRoot + ""
	exampleUrl = serverRoot + ""

}

func main() {

	/*
	 * setup the clientcredentials Configuration data
	 */
	conf := &clientcredentials.Config{
		ClientID:     appKey,
		ClientSecret: appSecret,
		Scopes:       []string{},
		TokenURL:     tokenUrl,
	}

	/*
	 * Get a client based on the configuration
	 */
	client = conf.Client(oauth2.NoContext)

	clientService = ClientService{Client: *client}

	http.HandleFunc("/", endpoint1)
	http.HandleFunc("/", endpoint2)
	http.ListenAndServe(":8080", nil)

}

type ClientService struct {
	Client http.Client
}

func endpoint1(w http.ResponseWriter, r *http.Request) {

}

func endpoint2(w http.ResponseWriter, r *http.Request) {

	var xmlStr = []byte(` `)
	req, err := http.NewRequest("GET", exampleUrl, bytes.NewBuffer(xmlStr))
	//req, err := http.NewRequest("POST", url, bytes.NewBuffer(file))
	//req.Header.Set("X-Custom-Header", "myvalue")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err, resp)
	}

}
