package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var portnumer string = ":8085"
var results []string
var (
	// flagPort is the open port the application listens on
	flagPort = flag.String("port", portnumer, "Port to listen on")
)

//List of all Countries
type Article struct {
	Id      int    `json:"Id"`
	Country string `json:"Country"`
}

type Articles []Article

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "List of Countries!")
	fmt.Println("Endpoint Hit: homePage")
}

//definition for endpoint
func returnAllCountries(w http.ResponseWriter, r *http.Request) {
	articles := Articles{
		Article{Id: 1, Country: "USA"},
		Article{Id: 2, Country: "UK"},
	}
	fmt.Println("Endpoint Hit: returnAllCountries")

	json.NewEncoder(w).Encode(articles)
}

//definition for endpoint
func returnACountry(w http.ResponseWriter, r *http.Request) {
	articles := Articles{
		//Article{Id: 1, Country: "USA"},
		Article{Id: 2, Country: "UK"},
	}
	fmt.Println("Endpoint Hit: returnACountry")

	json.NewEncoder(w).Encode(articles)
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/all", returnAllCountries)
	myRouter.HandleFunc("/UK", returnACountry)
	log.Printf("listening on port %s", *flagPort)
	log.Fatal(http.ListenAndServe(portnumer, myRouter))

}

func main() {
	handleRequests()
}
