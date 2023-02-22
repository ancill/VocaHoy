package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

const (
	ImageDir = "./media_temp" // the directory containing the images
	Port     = ":8080"        // the port on which to serve the images
)

func main() {
	// Serve images from the ImageDir directory
	http.HandleFunc("/images/", serveImage)

	// Start the server
	fmt.Printf("Listening on port %s...\n", Port)
	err := http.ListenAndServe(Port, nil)
	if err != nil {
		fmt.Printf("Error starting server: %s\n", err)
		os.Exit(1)
	}
}

// serveImage serves the image at the requested URL path
func serveImage(w http.ResponseWriter, r *http.Request) {
	// Get the requested image file path from the URL path
	imagePath := filepath.Join(ImageDir, filepath.Clean(r.URL.Path[len("/images/"):]))
	if _, err := os.Stat(imagePath); os.IsNotExist(err) {
		http.NotFound(w, r)
		return
	}

	// Serve the image file
	http.ServeFile(w, r, imagePath)
}
