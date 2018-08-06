package main

import (
	"fmt"
	"net/http"
	"time"
)

var test = ""

func doSomething(s string) {
	fmt.Println("doing something", s)
	test = "test1"
}

func helloWorld(w http.ResponseWriter, r *http.Request) {
	for {
		time.Sleep(2 * time.Second)
		fmt.Fprintf(w, "Hello World")
	}
}

func startPolling1() {
	for {
		time.Sleep(2 * time.Second)
		go doSomething("from in function 1")
		
	}
}

func startPolling2() {
	for {
		//call after startPolling
		<-time.After(2 * time.Second)
		go doSomething("from in function 2")
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love!")
	//fmt.Fprintf(w, test, r.URL.Path[1:])
}

func main() {
	go startPolling1()
	go startPolling2()

	http.HandleFunc("/", handler)
	http.HandleFunc("/a", helloWorld)
	http.ListenAndServe(":8080", nil)
}
