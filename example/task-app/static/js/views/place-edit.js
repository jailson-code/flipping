import { View } from "../core/core.js"
import { data } from "../data/data.js"

/* PlaceEdit view. */
export class PlaceEdit extends View {
   constructor() {
      super("place-edit", "Place Edit")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Place Edit</h1>
         <p>Edit the place.</p>
         <form>
            <input type="text" placeholder="Name" id="place-edit__name">
            <input type="text" placeholder="Street" id="place-edit__street">
            <input type="text" placeholder="Number" id="place-edit__number">
            <input type="text" placeholder="District" id="place-edit__district">
            <input type="text" placeholder="City" id="place-edit__city">
            <input type="text" placeholder="State" id="place-edit__state">
            <input type="text" placeholder="Country" id="place-edit__country">
            <input type="text" placeholder="Zip" id="place-edit__zip">
            <button id="place-edit__save">Save</button>
         </form>
      `

      let form = document.querySelector("#place-edit form")
      form.onsubmit = event => event.preventDefault()

      let save = document.querySelector("#place-edit__save")
      save.addEventListener("click", this.updatePlace)
   }

   async inside() {
      super.inside()
      // console.log("place-edit in")
      env.selectItem("places")
      this.fill()
   }

   async outside() {
      super.outside()
      // console.log("place-edit out")
      env.unselectItem("places")
      env.selectedPlace = null
   }

   // Fill the view.
   fill() {
      let form = document.querySelector("#place-edit form")
      let name = document.querySelector("#place-edit__name")
      let street = document.querySelector("#place-edit__street")
      let number = document.querySelector("#place-edit__number")
      let district = document.querySelector("#place-edit__district")
      let city = document.querySelector("#place-edit__city")
      let state = document.querySelector("#place-edit__state")
      let country = document.querySelector("#place-edit__country")
      let zip = document.querySelector("#place-edit__zip")

      if (env.selectedPlace) {
         form.style.display = "grid"
         name.value = env.selectedPlace.name
         street.value = env.selectedPlace.street
         number.value = env.selectedPlace.number
         district.value = env.selectedPlace.district
         city.value = env.selectedPlace.city
         state.value = env.selectedPlace.state
         country.value = env.selectedPlace.country
         zip.value = env.selectedPlace.zip
      }
      else {
         form.style.display = "none"
      }
   }

   // Update place.
   async updatePlace() {
      let name = document.querySelector("#place-edit__name")
      let street = document.querySelector("#place-edit__street")
      let number = document.querySelector("#place-edit__number")
      let district = document.querySelector("#place-edit__district")
      let city = document.querySelector("#place-edit__city")
      let state = document.querySelector("#place-edit__state")
      let country = document.querySelector("#place-edit__country")
      let zip = document.querySelector("#place-edit__zip")
      if (name.value.trim() == "" || street.value.trim() == "") { return }
      env.selectedPlace.name = name.value.trim()
      env.selectedPlace.street = street.value.trim()
      env.selectedPlace.number = number.value.trim()
      env.selectedPlace.district = district.value.trim()
      env.selectedPlace.city = city.value.trim()
      env.selectedPlace.state = state.value.trim()
      env.selectedPlace.country = country.value.trim()
      env.selectedPlace.zip = zip.value.trim()
      data.updatePlace(env.selectedPlace).then(result => {
         if (result) {
            console.log(env.selectedPlace)
         }
         else {
            console.log("update failed")
         }
      })
   }
}