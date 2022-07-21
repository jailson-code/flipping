# Flipping

Flipping is a mini _static server_ and _frontend template_ for **single page application** (SPA) projects, developed in **Pure JavaScript** (no framework) by [Jailson Lima]().

> [Versão em português](https://github.com/jailson-code/flipping/blob/main/README.pt.md)

## Single Page Application

The organization of the _frontend template_ with the _Single Page Application_ is inside the `static` folder.

```
├── static
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   ├── html
│   │   ├── images
│   │   ├── js
│   ├── css
│   │   ├── layout.css
│   ├── js
│   │   ├── components
│   │   ├── core
│   │   ├── environment
│   │   ├── models
│   │   ├── routes
│   │   ├── utility
│   │   ├── views
│   │   ├── main.js
│   │   ├── startup.js
|   ├── index.html
```

> **Note**: The organization of the contents of the `static` folder is completely free.

### Folders: `assets`, `css` and `js`

The `assets`, `css` and `js` folders are just a suggestion and are intended to contain:

- `assets`: `css`, `fonts`, `html`, `images` and `js` folders, to store fonts, images and _css_ and _js_ files from external libraries. The `html` folder is the place to store the custom error pages `404.html` and `500.html`, _optional_.
- `css`: _CSS_ files like `layout.css`, for example.
- `js`: application's _JavaScript_ files.

### `index.html`

It contains the global markup and is also the starting point of the application. It must contain 3 items:

- A `link` element to `layout.css`.
   ```html
   <link rel="stylesheet" href="/css/layout.css">
   ```
- A `div` element with the application `id`.
   ```html
   <div id="app"></div>
   ```
- A `script` element for `main.js`.
   ```html
   <script type="module" src="/js/main.js"></script>
   ```

### `layout.css`

The `layout.css` file contains the main _CSS_ of the application, but others can be added.

### `main.js`

Contains the main application code.

```javascript
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
```

In the code above we create an `Application` object, which represents the _SPA_, passing to its constructor the same value as the `id` of the `div#app` element declared in `index.html`. Then we pass the application's **routes** defined in `routes.js`. Then we pass to the _startup stack_ of the application, the functions defined in `environment.js`, `components.js` and `startup.js`.

> **Note**: The order in which initialization functions are pushed onto the application stack is the order in which they will be executed. We always pass the `environment.js` module function first, to load the application's **environment variables**.

### `startup.js`

Contains the global code that can be used by _views_, for example. Or general code that needs to be executed before the application starts.

### Routes

The _routes_ are defined in the `routes.js` file inside the `routes` folder.

```javascript
import { Dashboard } from "../views/dashboard.js"
import { TaskList } from "../views/task-list.js"
import { PlaceList } from "../views/place-list.js"
import { Settings } from "../views/settings.js"

export const routes = [
   {path: "/", view: Dashboard},
   {path: "/tasks", view: TaskList},
   {path: "/places", view: PlaceList},
   {path: "/settings", view: Settings}
]
```

**Routing**:

Access to _views_ via the routes can be done in the markup through an `a` element with the `data-link` attribute:

```html
<ul>
   <li><a href="/" data-link>Dashboard</a></li>
   <li><a href="/tasks" data-link>Tasks</a></li>
   <li><a href="/places" data-link>Places</a></li>
   <li><a href="/settings" data-link>Settings</a></li>
</ul>
```

In code via the `navigate(url)` method available throughout the application via the **global object** `app`:

```javascript
app.navigate("/tasks")
```

Or by typing the full _URL_ of the route into the _address bar_ of the browser. For example:

```
http://localhost:3000/tasks
```

**Anchoring via the hash in the URL:**

Anchoring an element with `id` equal to `hash` of _URL_ can be done in three ways:

1. Directly from the **address bar** of the browser, typing the _URL_:
   ```
   http://localhost:3000/tasks#new-task
   ```
2. Within the **same view**. In this case we use a simple `a` element, without the `data-link` attribute:
   ```html
   <a href="#new-task">New Task</a>
   ```
3. To **another view**. In this case it is necessary to use an `a` element with the `data-link` attribute:
   ```html
   <a href="/tasks#new-task" data-link>New Task</a>
   ```
   or use the `navigate(url)` method in the code:
   ```javascript
   app.navigate("/tasks#new-task")
   ```

### Views

The _views_ are inside the `views` folder. For example, the _view_ `Dashboard` is defined in the `dashboard.js` file inside the `views` folder.

```javascript
import { View } from "../core/core.js"

export class Dashboard extends View {
   constructor() {
      super("dashboard", "Dashboard")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Dashboard</h1>
         <p>See the complete to-do list:</p>
         <button id="dashboard__to-do-list">To-do List</button>
      `

      let toDoList = document.querySelector("#dashboard__to-do-list")

      toDoList.addEventListener("click", event => {
         app.navigate("/tasks")
      })
   }
}
```

The _views_ must extend the `View` class and pass the `id` and `title` parameters to the superclass constructor:

`View` class constructor:

```javascript
View(id [, title])
```

Where:

- `id`: will be the `id` used in the `div` that will represent the _view_ in **`index.html`**.
- `title`: is the title of the `document`, that is, of the page when the _view_ is displayed. _Optional_.

The `View` class contains 4 asynchronous methods that can be overridden, which are: `create()`, `update()`, `inside()` and `outside`.

- `create`: Used to define markup, style and behavior of the _view_ that will be executed only once when the _view_ is instantiated, and before it is displayed for the first time. It is called in the _constructor_ of the superclass.
- `update`: Contains _view_ markup, style and behavior that need to be updated whenever it enters the scene. It is called in the `inside()` method of the superclass.
- `inside`: It's the place to put the code that should be executed whenever the _view_ enters the scene.
- `outside`: It's the place to put the code that should be executed whenever the _view_ exits the scene.

> **Note**: When overriding the methods of the `View` class, the first line of the method body must always be a call to the superclass method.

### Models

The data models used in the application are stored in the `models.js` file inside the `models` folder. Example:

```javascript
import { gid, timestamp } from "./utility.js"

// Task model.
export class Task {
   constructor(title) {
      this.title = title || ""
      this.completed = false
      this.timestamp = timestamp()
      this.placeId = ""
      this.id = gid()
   }
}
```

> The models can be separated into individual files for each model.

### Utilities

Utility objects and functions can be defined in the `utility.js` file inside the `utility` folder. Example:

```javascript
// Identifier generator.
export const gid = () => {
   const mask = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
   return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () => mask[Math.random() * mask.length | 0])
}

// Timestamp generator.
export const timestamp = date => {
   if (date)
      return new Date(date).toISOString()
   else
      return new Date().toISOString()
}
```

### Web Components

Web components can be defined in the `components.js` file inside the `components` folder. Example:

```javascript
class CheckIcon extends HTMLElement {
   constructor() {
      super()
   }
}
```

### `environment.js`

It is in this file that we define the _global variable_ `env` which is used to store configuration constants, global objects and functions available throughout the application. The `environment()` function passed to the _startup stack_ of `app` is the one that initializes the global variable `env`.

```javascript
export const environment = () => {
   // Global variables and functions.
   const env = {
      BASE_URL: ""
   }

   // Sets the env global variable.
   window.env = env
}
```

### `core.js`

The `core.js` file is responsible for the correct functioning of the _Single Page Application_. This is where we define the `Application`, `Router` and `View` classes that serve to:
- `Application`: represents the **single page application** itself, contains the list of _routes_ with their respective _views_, the _router_, the _startup functions stack_, and a reference to the `div#app` element that represents the _DOM_ root of the _SPA_. It also contains the `run()` methods used to start the application and `navigate(url)` used to go to a specific route.
- `Router`: represents the application's **router**, contains the list of _routes_ and _views_, in addition to the _current_ and _previous_ routes. It also contains the `params` object with the parameters (_key/value_) extracted from _parameterized routes_, like for example: `/tasks/[id]` always with respect to the current route. Contains the `routing()` method called in its constructor to start routing the application.
- `View`: represents the **views** of the application, that is, the components with markup, style and behavior that are accessed by _routes_. Contains the methods: `create()`, `update()`, `inside()` and `outside()`.

The `core.js` contains other important elements for the _Single Page Application_, besides the mentioned classes, such as the functions `resolveURL()`, `regexURL()`, `getParams()` and `changeRoute()`, and also serves to abstract the inherent complexity of the application's operation, allowing _SPA_ applications to be developed in a simple way.

### Global Variables

Two global variables are defined: `env` and `app`.
- `env`: is the global variable used to make available throughout the application: **configuration constants**, **objects** and **global functions**, and **view objects** if necessary, for example, for call a _view_ method from the markup:
   ```html
   <check-icon onclick="env.taskList.checkTask(this)"></check-icon>
   ```
- `app`: is the `Application` object itself, defined in `main.js`, which is set as a global variable by its constructor, so that its properties and methods, such as `navigate(url)`, can be available throughout the application.


## `Application` Class

The `Application` class represents the _Single Page Application_ itself.

**Constructor:**

```javascript
Application(id)
```

The constructor of the `Application` class takes a single parameter which is the `id` of the `div#app` element declared in `index.html`. It is in this `div` element that the `Application` object will insert the `div` elements of the `View` objects for each route.

**Properties:**

- `element`: `HTMLElement` object from `div#app`. From there we can access the entire _DOM_ tree of the _SPA_.
- `routes`: array with the routes declared in `routes.js`.
- `router`: `Router` object that will routing the _SPA_.
- `stack`: stack of synchronous startup functions executed before the creation of the _views_ when the `run()` method is called.
- `onroute`: asynchronous callback function executed whenever there is a route change. It takes a single parameter, `route`, which is the application's current route. Example of use:
   ```javascript
   app.onroute = async route => {
      console.log(route)
   }
   ```

**Methods:**

```javascript
run()
```

The `run()` method is used to start the application. It executes the _startup stack_ functions in the order they are placed, and only then creates the `Router` object, passing it the `routes` array containing the routes. The `Router` object will in turn go through each of the _routes_ and create the respective _views_ that have been declared.

```javascript
navigate(url)
```

The `navigate(url)` method is used to go to a certain route indicated by the `url` passed as a parameter.

## `View` Class

The `View` class represents the _views_ of the _Single Page Application_. Every _view_ class in the application must extend this class.

**Constructor:**

```javascript
View(id [, title])
```

The `View` class constructor takes two parameters. The first is the `id` that will be used as the `id` of the `div` that will represent the _view_ in the markup. The second, which is optional, is the `title`, which is the title of the page when the _view_ is displayed.

**Properties:**

- `element`: `HTMLElement` object of the `div#id` representing the _view_ in the markup. From there, the entire _DOM_ tree of the _view_ can be accessed.
- `title`: title of _view_.

> Note that the `id` passed to the constructor does not exist as a property of the `View` class. But it can be accessed from the `element` property: `this.element.id`.

**Methods:**

```javascript
create()
```

The `create()` method should be used to define the markup, style and behavior of the _view_ which will be executed once when the _view_ is instantiated, and before it is displayed for the first time. It is called in the _constructor_ of the `View` class. This method, in general, should contain the **fixed markup** of the _view_ and its associated behavior.

```javascript
update()
```

The `update()` method should be used to define the markup, style and behavior of the _view_ that needs to be updated whenever it enters the scene. It is called in the `inside()` method of the `View` class. In general, this method should contain the **dynamic markup** of the _view_ and its associated behavior.

```javascript
inside()
```

The `inside()` method is executed whenever the _view_ enters the scene. So any code that needs to be executed at the time the _view_ is displayed must be called in this method.

```javascript
outside()
```

The `outside()` method is executed whenever the _view_ exits the scene. Thus, any code that needs to be executed the moment the _view_ stops being displayed must be called in this method.

## `Router` Class

The `Router` class represents the _router_ of the _Single Page Application_. The `Application` class contains the `router` property which is a `Router` object, which is instantiated when the `run()` method is executed. Thus, `Router` objects are not created manually.

**Constructor:**

```javascript
Router(routes)
```

The `Router` class constructor receives the `routes` array containing the _routes_ defined in `routes.js`. It is the one who iterates through the routes and instantiates each of the defined _views_.

**Properties:**

- `routes`: array with the **routes** registered from _SPA_.
- `route`: current route (_actual_).
- `previous_route`: previous route.
- `pathname`: _pathname_ of the current route.
- `search`: _search_ with the _query string_ of the current route.
- `hash`: _hash_ of the current route.
- `params`: object with the _parameters_, `key:value`, of the **parameterized routes**, if any, extracted from `pathname`. For example: if a route is registered: `/tasks/[id]`, and the URL is accessed: `/tasks/1234`, then the `params` property will contain the object `{id: "1234"}`.
- `queries`: object with the _query string_ of the current route, extracted from `search`. For example: if `search` contains the string `"?name=Newton?age=21"`, then `queries` will contain the object `{name: "Newton", age: "21"}`.

Note that, we can access the _router_ properties inside the _views_ through the global variable `app`. In general, the most used are: `route`, `params` and `queries`. For example, in a _view_ called `TaskView` which is intended to show the details of a task from its `id` passed in the _URL_. If the _view_ was registered like this:

```javascript
routes = [
   {path: "/tasks/[id]", view: TaskView}
]
```

Then, inside the `update()` method of the _view_ `TaskView`, we can search and display the task whose `id` is passed by the URL: `/tasks/1234`, for example. And we have access to the parameters through `app.router.params`.

```javascript
async update() {
   super.update()

   // Searching for the correct task by id.
   const id = app.router.params.id
   const task = this.tasks.find(task => task.id == id)

   // Viewing the task.
   if (task)
      this.element.innerHTML = `<h1>${task.title}</h1>`
   else
      this.element.innerHTML = "<h1>Task not found.</h1>"
}
```

**Methods:**

```javascript
routing()
```

The `routing()` method is responsible for starting the **routing** process of the _Single Page Application_. It is called in the _constructor_ of `Router` after all the _views_ have been created.

## CSS Organization

The _CSS_ style organization pattern used is only a recommendation, and can be modified, organized in numerous other ways. After the `run()` method is executed the `body` element of the markup in `index.html` will have the following content:

```html
<body>
   <div id="app">
      <div class="view" id="dashboard"></div>
      <div class="view" id="task-list"></div>
      <div class="view" id="place-list"></div>
      <div class="view" id="settings"></div>
   </div>

   <script type="module" src="/js/main.js"></script>
</body>
```

Thus, the suggestion is to organize the _CSS_ of the _views_ in `layout.css` as follows:

```css
/* General */

* {
   margin: 0;
   padding: 0;
}

:root {
   --color-primary: #0088EE;
   --color-background: #FFFFFF;
}

html {
  scroll-behavior: smooth;
}

body {
   background-color: var(--color-background);
   overflow-x: hidden;
}

/* Web Components */

check-icon {
   position: relative;
}

/* Application */

#app {}

/* View */

.view {}

/* Dashboard */

#dashboard {}

/* Tasks */

#task-list {}

/* Places */

#place-list {}

/* Settings */

#settings {}
```

> Another way would be to leave the global style, the external style of _web components_ and the style of `#app` and `.view` in `layout.css`, and create own _CSS_ files for each of the _views_, and call them all them in `index.html`.

Note that the `View` classes can still insert and modify the _CSS_ style of their components, if necessary.

## Static Server

The **static file server** only processes files inside the _static folder_ `static`, which is the folder with the public files of the frontend application. Requests to access files outside this folder are not allowed.
The project folder organization structure follows below. The generic name of the `project` folder must be replaced by the specific name of the project to be developed.

```
├── project
│   ├── src
│   │   ├── constants.js
│   │   ├── logger.js
│   │   ├── settings.js
│   ├── static
│   ├── package.json
│   ├── server.js
```

The files in the `src` folder: `constants.js`, `logger.js` and `settings.js` contain constants and functions used by the server. In particular the `settings.js` file contains the port, static folder and server cache settings that can be edited if necessary. In the `static` folder is the frontend application itself. The `package.json` file is the project descriptor file. Finally, the `server.js` file contains the main code of the **static file server** for the frontend application of type **single page application**.

**Server rules:**

1. If a **valid path** is requested, that is, it exists within the static folder, the server will:
   1.1 Check if the path represents a **file** or a **directory**.
   1.2 If it's a **file**, it returns the requested file.
   1.3 If it's a **directory** it tries to find an `index.html` file in the directory and returns it.
2. If the **path** requested **does not exist**, the server will:
   2.1 Check if the path, even if it doesn't exist, represents a **file** or a **directory**.
   2.2 If it's a **file**, it returns _404 Not Found_.
   2.3 If it's a **directory** it returns the `index.html` file from the root of the static folder, and lets the _single page application_ do the **virtual routing** on the browser side.

> **Note**: If in any of the cases _1.2_, _1.3_ or _2.3_ the file to be returned does not exist or a read error occurs, the server will return _404 Not Found_. In case of _404 Not Found_ or _500 Internal Server Error_ while processing a request, the server will look for custom error pages `404.html` and `500.html` respectively, in the folder `/static/assets/html` to return. These pages are optional.