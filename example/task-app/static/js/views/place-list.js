import { View } from "../core/core.js"
import { data } from "../data/data.js"

/* PlaceList view. */
export class PlaceList extends View {
   constructor() {
      super("place-list", "Places")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Places</h1>
         <p>Places list.</p>
         <button id="place-list__add">Add Place</button>
         <ul class="places"></ul>
      `

      let add = document.querySelector("#place-list__add")

      add.addEventListener("click", event => {
         app.navigate("/places/add")
      })

      // Sets in the global variable env.
      window.env.placeList = this
   }

   async update() {
      super.update()
      this.renderPlaces()
   }

   async inside() {
      super.inside()
      // console.log("place-list in")
      env.selectItem("places")
   }

   async outside() {
      super.outside()
      // console.log("place-list out")
      env.unselectItem("places")
   }

   // Render places.
   renderPlaces() {
      let ul = this.element.children[3]

      if (env.places.length > 0) {
         ul.style.display = "block"
      }
      else {
         ul.style.display = "none"
      }

      ul.innerHTML = ""

      env.places.forEach(place => {
         let address = place.street
         address += (place.number != "") ? (", " + place.number) : ""
         address += (place.city != "") ? (" - " + place.city) : ""
         address += (place.country != "") ? (" - " + place.country) : ""
         ul.innerHTML += `
            <li id=${"id" + place.id} onclick="env.placeList.viewPlace(event, '${place.id}')">
               <div>
                  <label>
                     <small>${place.name}</small>
                     <span>${address}</span>
                  </label>
               </div>
               <div>
                  <pen-button onclick="env.placeList.editPlace('${place.id}')"></pen-button>
                  <trash-button onclick="env.placeList.removePlace('${place.id}')"></trash-button>
               </div>
            </li>
         `
      })
   }

   // View place.
   viewPlace(event, id) {
      const tagName = event.target.tagName
      if (["LI", "DIV", "LABEL", "SMALL", "SPAN"].find(tag => tag == tagName)) {
         app.navigate("/places/" + id)
      }
   }

   // Edit place.
   editPlace(id) {
      let place = env.places.find(place => place.id == id)
      env.selectedPlace = Object.assign({}, place)
      app.navigate("/places/edit")
   }

   // Remove place.
   removePlace(id) {
      let ul = document.querySelector(".places")

      for (let i = 0; i < env.places.length; i++) {
         if (env.places[i].id == id) {
            data.removePlace(id).then(result => {
               if (result) {
                  ul.removeChild(ul.children[i])
                  if (env.places.length > 0) {
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