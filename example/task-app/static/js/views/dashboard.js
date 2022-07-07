import { View } from "../core/core.js"

/* Dashboard view. */
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

   async inside() {
      super.inside()
      // console.log("dashboard in")
      env.selectItem("dashboard")
   }

   async outside() {
      super.outside()
      // console.log("dashboard out")
      env.unselectItem("dashboard")
   }
}