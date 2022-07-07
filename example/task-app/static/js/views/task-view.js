import { View } from "../core/core.js"

/* TaskView view. */
export class TaskView extends View {
   constructor() {
      super("task-view", "Task View")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Task Not Found!</h1>
      `
   }

   async update() {
      super.update()
      this.displayTask()
   }

   async inside() {
      super.inside()
      // console.log("task-view in")
      env.selectItem("tasks")
   }

   async outside() {
      super.outside()
      // console.log("task-view out")
      env.unselectItem("tasks")
   }

   // Shows the task with corresponding id.
   displayTask() {
      const id = app.router.params.id
      if (id) {
         let task = env.tasks.find(task => task.id == id)
         let title = this.element.children[0]
         if (task)
            title.textContent = task.title
         else
            title.textContent = "Task Not Found!"
      }
   }
}