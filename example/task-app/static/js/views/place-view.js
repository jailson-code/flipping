import { View } from "../core/core.js"

/* PlaceView view. */
export class PlaceView extends View {
   constructor() {
      super("place-view", "Place View")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Place Not Found!</h1>
      `
   }

   async update() {
      super.update()
      this.displayPlace()
   }

   async inside() {
      super.inside()
      // console.log("place-view in")
      env.selectItem("places")
   }

   async outside() {
      super.outside()
      // console.log("place-view out")
      env.unselectItem("places")
   }

   // Shows the place with corresponding id.
   displayPlace() {
      const id = app.router.params.id
      if (id) {
         let place = env.places.find(place => place.id == id)
         let name = this.element.children[0]
         if (place)
            name.textContent = place.name
         else
            name.textContent = "Place Not Found!"
      }
   }
}