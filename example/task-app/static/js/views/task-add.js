import { View } from "../core/core.js"
import { Task } from "../models/models.js"
import { data } from "../data/data.js"

/* TaskAdd view. */
export class TaskAdd extends View {
   constructor() {
      super("task-add", "Task Add")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Task Add</h1>
         <p>Add a new task.</p>
         <input type="text" placeholder="Title" id="task-add__title">
         <button id="task-add__add">Add</button>
      `

      let title = document.querySelector("#task-add__title")
      title.addEventListener("keyup", event => {
         if (event.key == "Enter") {
            this.saveTask()
         }
      })

      let add = document.querySelector("#task-add__add")
      add.addEventListener("click", this.saveTask)
   }

   async inside() {
      super.inside()
      // console.log("task-add in")
      env.selectItem("tasks")
   }

   async outside() {
      super.outside()
      // console.log("task-add out")
      env.unselectItem("tasks")
   }

   // Save task.
   async saveTask() {
      let title = document.querySelector("#task-add__title")
      let value = title.value.trim()
      if (value == "") { return }
      let task = new Task(value)
      data.saveTask(task).then(result => {
         if (result) {
            console.log(task)
         }
         else {
            console.log("save failed")
         }
      })
      title.value = ""
   }
}