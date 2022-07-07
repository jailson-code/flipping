import { Application } from "./core/core.js"
import { routes } from "./routes/routes.js"
import { environment } from "./environment/environment.js"
import { components } from "./components/components.js"
import { startup } from "./startup.js"

let app = new Application("app")
app.routes = routes
app.stack.push(environment)
app.stack.push(components)
app.stack.push(startup)
app.run()

app.onroute = async route => {
   console.log("route:", route)
}

console.log(app)
console.log(env)