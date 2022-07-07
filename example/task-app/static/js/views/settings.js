import { View } from "../core/core.js"
import { data } from "../data/data.js"

/* Settings view. */
export class Settings extends View {
   constructor() {
      super("settings", "Settings")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Settings</h1>
         <p>Change application settings here.</p>
         <button id="settings__clear-all">Clear All</button>
      `

      let clearAll = document.querySelector("#settings__clear-all")

      clearAll.addEventListener("click", event => {
         data.clear()
         console.log("clear all")
      })
   }

   async inside() {
      super.inside()
      // console.log("settings in")
      env.selectItem("settings")
   }

   async outside() {
      super.outside()
      // console.log("settings out")
      env.unselectItem("settings")
   }
}