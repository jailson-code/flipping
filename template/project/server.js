/* Created by Jailson Lima and released under the MIT License.

   HTTP Server of Static Files for Single Page Application (SPA) frontend projects.

   The STATIC_PATH variable represents the path of the static folder on
   the server with public files, that is, files that can be accessed. */

import http from "http"
import path from "path"
import fs from "fs"
import { statusCode, mimeType } from "./resource/constants"
import { SUCCESS, WARNING, DANGER } from "./resource/terminal"
import { PORT, STATIC_PATH, ALLOW_ORIGIN, CACHE, SERVER } from "./resource/settings"

// Create the server.
let server = http.createServer((request, response) => {
   // Shows the method and URL of the request.
   console.log(request.method, SUCCESS(request.url))

   // Get the pathname, search and hash of the request.
   let pathname, search, hash
   [pathname, search, hash] = parseURL(request.url)

   // File path.
   let filePath = path.resolve(__dirname + STATIC_PATH + pathname)

   // Checks whether the path represents a directory or a file.
   fs.lstat(filePath, (error, stats) => {
      if (error) { // The path does not exist.
         // If it's a directory, it tries to find an index.html file in the root
         // directory and let the single page application do the virtual routing.
         if (path.extname(pathname) == "") {
            filePath = path.resolve(__dirname + STATIC_PATH, "index.html")
         }
      }
      else { // The path exists, that is, it represents a directory or file.
         // If it is a directory, it tries to find an index.html file.
         if (stats.isDirectory()) {
            filePath = path.resolve(filePath, "index.html")
         }
      }

      // Get the file extension.
      let extname = path.extname(filePath)

      // HTTP response headers.
      let headers = {
         "Content-Type": mimeType[extname] || "text/plain",
         "Access-Control-Allow-Origin": ALLOW_ORIGIN,
         "Cache-Control": CACHE,
         "Server": SERVER
      }

      // Read the file and send it.
      fs.readFile(filePath, (error, data) => {
         if (error) {
            if (error.code == "ENOENT") { // HTTP 404 (Not Found).
               notFound(response, headers)
               console.log(DANGER("404 NOT FOUND"))
            }
            else { // HTTP 500 (Internal Server Error).
               serverError(response, headers)
               console.log(DANGER("500 INTERNAL SERVER ERROR"))
               console.log(error)
            }
         }
         else { // HTTP 200 (OK).
            send(response, statusCode.OK, headers, data)
         }
      })
   })
})

// Get the pathname, search and hash of the URL.
const parseURL = url => {   
   let pathname = url
   let search = ""
   let hash = ""

   let index_hash = url.indexOf("#")

   if (index_hash != -1) {
      hash = url.slice(index_hash)
      pathname = url.slice(0, index_hash)
   }

   let index_search = pathname.indexOf("?")

   if (index_search != -1) {
      search = pathname.slice(index_search)
      pathname = pathname.slice(0, index_search)
   }

   return [pathname, search, hash]
}

// Send http response.
const send = (response, status, headers, body) => {
   response.writeHeader(status.code, headers)
   response.write(body)
   response.end()
}

// Get and send status page http.
const getStatusPage = async (response, status, headers) => {
   fs.readFile(path.resolve(__dirname + STATIC_PATH + "/assets/html/" + status.code + ".html"), (error, data) => {
      let body = ""

      if (error) {
         // Returns message "404 Not Found" or "500 Internal Server Error".
         headers["Content-Type"] = "text/plain"
         body = status.code + " " + status.reason
      }
      else {
         // Returns custom page 404 or 500.
         headers["Content-Type"] = "text/html"
         body = data
      }

      response.writeHeader(status.code, headers)
      response.write(body)
      response.end()
   })
}

// Send message 404 (Not Found).
const notFound = (response, headers) => {
   getStatusPage(response, statusCode.NOT_FOUND, headers)
}

// Send message 500 (Internal Server Error).
const serverError = (response, headers) => {
   getStatusPage(response, statusCode.INTERNAL_SERVER_ERROR, headers)
}

// Starts running the server.
server.listen(PORT, () => {
   console.log(WARNING("server running...\n"))
})