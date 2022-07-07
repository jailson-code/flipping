import { View } from "../core/core.js"
import { data } from "../data/data.js"

/* TaskList view. */
export class TaskList extends View {
   constructor() {
      super("task-list", "Tasks")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Tasks</h1>
         <p>To-do list.</p>
         <button id="task-list__add">Add Task</button>
         <ul class="tasks"></ul>
      `

      let add = document.querySelector("#task-list__add")

      add.addEventListener("click", event => {
         app.navigate("/tasks/add")
      })

      // Sets in the global variable env.
      window.env.taskList = this
   }

   async update() {
      super.update()
      this.renderTasks()
   }

   async inside() {
      super.inside()
      // console.log("task-list in")
      env.selectItem("tasks")
   }

   async outside() {
      super.outside()
      // console.log("task-list out")
      env.unselectItem("tasks")
   }

   // Render tasks.
   renderTasks = () => {
      let ul = this.element.children[3]

      if (env.tasks.length > 0) {
         ul.style.display = "block"
      }
      else {
         ul.style.display = "none"
      }

      ul.innerHTML = ""

      env.tasks.forEach(task => {
         ul.innerHTML += `
            <li id=${"id" + task.id} onclick="env.taskList.viewTask(event, '${task.id}')">
               <div>
                  <check-icon checked=${task.completed} onclick="env.taskList.checkTask(this)"></check-icon>
                  <small>${task.title}</small>
               </div>
               <div>
                  <pen-button onclick="env.taskList.editTask('${task.id}')"></pen-button>
                  <trash-button onclick="env.taskList.removeTask('${task.id}')"></trash-button>
               </div>
            </li>
         `
      })
   }

   // View task.
   viewTask(event, id) {
      const tagName = event.target.tagName
      if (["LI", "DIV", "SMALL"].find(tag => tag == tagName)) {
         app.navigate("/tasks/" + id)
      }
   }

   // Check task.
   checkTask(check_icon) {
      let li = check_icon.parentElement.parentElement
      let id = li.id.slice(2)
      let task = env.tasks.find(task => task.id == id)
      task.completed = !task.completed
      check_icon.setAttribute("checked", task.completed)
      data.updateTask(task).then(result => {
         if (result) {
            console.log(task)
         }
         else {
            console.log("update failed")
         }
      })
   }

   // Edit task.
   editTask(id) {
      let task = env.tasks.find(task => task.id == id)
      env.selectedTask = Object.assign({}, task)
      app.navigate("/tasks/edit")
   }

   // Remove task.
   removeTask(id) {
      let ul = document.querySelector(".tasks")

      for (let i = 0; i < env.tasks.length; i++) {
         if (env.tasks[i].id == id) {
            data.removeTask(id).then(result => {
               if (result) {
                  ul.removeChild(ul.children[i])
                  if (env.tasks.length > 0) {
                     ul.style.display = "block"
                  }
                  else {
                     ul.style.display = "none"
                  }
                  console.log("removed:", id)
               }
               else {
                  console.log("remove failed")
               }
            })
            break
         }
      }
   }
}