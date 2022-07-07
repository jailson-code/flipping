import { View } from "../core/core.js"

/* Single view. */
export class Single extends View {
   constructor() {
      super("single", "Single")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Single</h1>
         <p>Single Page Application</p>
      `
   }
}