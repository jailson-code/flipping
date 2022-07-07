/* Resolve the url. */
export const resolveURL = url => {
   url = url.replace(/\/{2,}/g, "/") // Replaces multiple "/" characters with just one.
   if (url.length > 2)
      url = url.replace(/\/$/g, "")  // Remove the final "/" character.
   return url
}

/* Generates regular expression for the url. */
export const regexURL = url => {
   url = url.replace(/\[[^\/]+\]/g, "([\\w\\-]+)") // Finds parameter patterns [...] and replaces with groups (...).
   return "^" + url.replace(/\//g, "\\/") + "$"    // Assembles the regular expression.
}

/* Get url params. */
export const getParams = (route, url) => {
   let matches = url.match(route.regex)
   if (matches) {
      const keys = Array.from(route.path.matchAll(/\[([^\/]+)\]/g)).map(result => result[1])
      const values = matches.slice(1)
      return Object.fromEntries(keys.map((key, i) => [key, values[i]]))
   }
   else {
      return {}
   }
}

/* Get the queries from the search. */
export const getQueries = search => {
   const queries = search.split("?").filter(result => result != "")
   return Object.fromEntries(queries.map(query => query.split("=")))
}

/* Make the change of route. */
export const changeRoute = async () => {
   const router = app.router

   if (router.routes.length == 0) {
      return
   }

   router.pathname = resolveURL(location.pathname)
   router.search = location.search
   router.hash = location.hash
   router.queries = getQueries(router.search)

   router.previous_route = router.route
   router.route = router.routes.find(route => router.pathname.match(route.regex))

   if (!router.route) {
      router.route = router.routes[0]
      router.pathname = router.route.path
   }

   router.params = getParams(router.route, router.pathname)

   if (router.route != router.previous_route) {
      if (router.previous_route)
         router.previous_route.view.outside()
      router.route.view.inside()
      if (app.onroute)
         app.onroute(router.route)
   }

   const url = router.pathname + router.search + router.hash
   history.replaceState(null, null, url)

   // console.log(router.previous_route, router.route) // log previous_route and route.
}

/* Scrolls to element with id equal to hash. */
export const scrollHash = async id => {
   try { document.querySelector(id).scrollIntoView() } catch (error) {}
}

/* Navigate to url. */
export const navigate = url => {
   history.pushState(null, null, url)
   changeRoute()
   scrollHash(location.hash)
}

/* Application model. */
export class Application {
   constructor(id) {
      this.element = document.querySelector("#" + id)
      this.routes = []
      this.router = null
      this.stack = [] // Stack of synchronous startup functions.
      this.onroute    // Asynchronous callback function executed when route changes.

      // Sets the app global variable.
      window.app = this
   }

   run() {
      // Executes stack functions.
      for (let i = 0; i < this.stack.length; i++)
         this.stack[i]()

      // Create the router.
      this.router = new Router(this.routes)
   }

   /* Navigate to url. */
   navigate(url) {
      navigate(url)
   }
}

/* Router model. */
export class Router {
   constructor(routes = []) {
      this.routes = routes // Registered routes.
      this.route = null    // Current route.
      this.previous_route  // Previous route.
      this.pathname = ""   // pathname.
      this.search = ""     // search.
      this.hash = ""       // hash.
      this.params = {}     // Parameters of the pathname.
      this.queries = {}    // Queries of the search.

      // Resolve path, generate regex and replaces view
      // classes with view objects for each route.
      for (let i = 0; i < this.routes.length; i++) {
         this.routes[i].path = resolveURL(this.routes[i].path)
         this.routes[i].regex = regexURL(this.routes[i].path)
         this.routes[i].view = new this.routes[i].view()
      }

      this.routing()
   }

   // Starts application routing.
   routing() {
      window.addEventListener("popstate", changeRoute)

      document.addEventListener("DOMContentLoaded", event => {
         document.body.addEventListener("click", event => {
            if (event.target.matches("[data-link]")) {
               event.preventDefault()
               navigate(event.target.href)
            }
         })
         changeRoute()
      })
   }
}

/* View model. */
export class View {
   constructor(id, title) {
      this.element = document.createElement("div")
      this.element.classList.add("view")
      this.element.id = id
      this.element.style.display = "none"
      this.title = title || document.title

      this.create()
   }

   // Markup, style, and code of the view created at startup.
   async create() {
      app.element.appendChild(this.element)
   }

   // Markup, style, and code of the view that need to
   // be updated whenever the view enters the scene.
   async update() {}

   // Executed whenever the view enters the scene.
   async inside() {
      this.element.style.display = "block"
      document.title = this.title
      this.update()
   }

   // Executed whenever the view exits the scene.
   async outside() {
      this.element.style.display = "none"
   }
}