import { View } from "../core/core.js"
import { Place } from "../models/models.js"
import { data } from "../data/data.js"

/* PlaceAdd view. */
export class PlaceAdd extends View {
   constructor() {
      super("place-add", "Place Add")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Place Add</h1>
         <p>Add a new place.</p>
         <form>
            <input type="text" placeholder="Name" id="place-add__name">
            <input type="text" placeholder="Street" id="place-add__street">
            <input type="text" placeholder="Number" id="place-add__number">
            <input type="text" placeholder="District" id="place-add__district">
            <input type="text" placeholder="City" id="place-add__city">
            <input type="text" placeholder="State" id="place-add__state">
            <input type="text" placeholder="Country" id="place-add__country">
            <input type="text" placeholder="Zip" id="place-add__zip">
            <button id="place-add__add">Add</button>
         </form>
      `

      let form = document.querySelector("#place-add form")
      form.onsubmit = event => event.preventDefault()

      let add = document.querySelector("#place-add__add")
      add.addEventListener("click", this.savePlace)
   }

   async inside() {
      super.inside()
      // console.log("place-add in")
      env.selectItem("places")
   }

   async outside() {
      super.outside()
      // console.log("place-add out")
      env.unselectItem("places")
      this.clear()
   }

   // Save place.
   async savePlace() {
      let name = document.querySelector("#place-add__name")
      let street = document.querySelector("#place-add__street")
      let number = document.querySelector("#place-add__number")
      let district = document.querySelector("#place-add__district")
      let city = document.querySelector("#place-add__city")
      let state = document.querySelector("#place-add__state")
      let country = document.querySelector("#place-add__country")
      let zip = document.querySelector("#place-add__zip")
      if (name.value.trim() == "" || street.value.trim() == "") { return }
      let place = new Place(
         name.value.trim(),
         street.value.trim(),
         number.value.trim(),
         district.value.trim(),
         city.value.trim(),
         state.value.trim(),
         country.value.trim(),
         zip.value.trim()
      )
      data.savePlace(place).then(result => {
         if (result) {
            console.log(place)
         }
         else {
            console.log("save failed")
         }
      })
      name.value = ""
      street.value = ""
      number.value = ""
      district.value = ""
      city.value = ""
      state.value = ""
      country.value = ""
      zip.value = ""
   }

   // Clear input fields.
   async clear() {
      let inputs = Array.from(document.querySelectorAll("#place-add form input"))
      inputs.forEach(input => input.value = "")
   }
}