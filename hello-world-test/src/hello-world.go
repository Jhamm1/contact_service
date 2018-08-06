package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/message", Message)
	router.HandleFunc("/ready", TodoIndex)

	log.Fatal(http.ListenAndServe(":8080", router))
}

func Message(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello world! from Julian Hamm")
}

func TodoIndex(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Ready when you're mate!")
}
