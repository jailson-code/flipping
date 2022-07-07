import { View } from "../core/core.js"
import { data } from "../data/data.js"

/* TaskEdit view. */
export class TaskEdit extends View {
   constructor() {
      super("task-edit", "Task Edit")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Task Edit</h1>
         <p>Edit the task.</p>
         <input type="text" placeholder="Title" id="task-edit__title">
         <button id="task-edit__save">Save</button>
      `

      let save = document.querySelector("#task-edit__save")
      save.addEventListener("click", this.updateTask)
   }

   async inside() {
      super.inside()
      // console.log("task-edit in")
      env.selectItem("tasks")
      this.fill()
   }

   async outside() {
      super.outside()
      // console.log("task-edit out")
      env.unselectItem("tasks")
      env.selectedTask = null
   }

   // Fill the view.
   fill() {
      let title = document.querySelector("#task-edit__title")
      let save = document.querySelector("#task-edit__save")

      if (env.selectedTask) {
         title.style.display = "inline-block"
         save.style.display = "inline-block"
         title.value = env.selectedTask.title
      }
      else {
         title.style.display = "none"
         save.style.display = "none"
      }
   }

   // Update task.
   async updateTask() {
      let title = document.querySelector("#task-edit__title")
      let value = title.value.trim()
      if (value == "" || env.selectedTask == null) { return }
      env.selectedTask.title = value
      data.updateTask(env.selectedTask).then(result => {
         if (result) {
            console.log(env.selectedTask)
         }
         else {
            console.log("update failed")
         }
      })
   }
}