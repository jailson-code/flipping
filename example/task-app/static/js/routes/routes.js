import { Dashboard } from "../views/dashboard.js"
import { TaskList } from "../views/task-list.js"
import { TaskAdd } from "../views/task-add.js"
import { TaskEdit } from "../views/task-edit.js"
import { TaskView } from "../views/task-view.js"
import { PlaceList } from "../views/place-list.js"
import { PlaceAdd } from "../views/place-add.js"
import { PlaceEdit } from "../views/place-edit.js"
import { PlaceView } from "../views/place-view.js"
import { Settings } from "../views/settings.js"

// Routes.
export const routes = [
   {path: "/", view: Dashboard},
   {path: "/tasks", view: TaskList},
   {path: "/tasks/add", view: TaskAdd},
   {path: "/tasks/edit", view: TaskEdit},
   {path: "/tasks/[id]", view: TaskView},
   {path: "/places", view: PlaceList},
   {path: "/places/add", view: PlaceAdd},
   {path: "/places/edit", view: PlaceEdit},
   {path: "/places/[id]", view: PlaceView},
   {path: "/settings", view: Settings}
]