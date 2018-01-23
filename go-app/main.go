package main
import (
	"fmt"
	"log"
	"net/http"
	"os"
)
func main() {
        //Dual Stack support (CFY && Legacy)
        var port string = os.Getenv("PORT")
        if port == "" {
		port = "8800"
	}
        fmt.Fprintf(os.Stdout, "APP Port is %s \n", port)
        http.HandleFunc("/3", third)
        http.HandleFunc("/archi", archi)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
func third(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Go : je suis app3 !!!!")
}
func archi(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Go : cocuou archi coll !!!!")
}

