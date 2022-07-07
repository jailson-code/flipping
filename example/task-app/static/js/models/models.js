import { gid, timestamp } from "../utility/utility.js"

// Task model.
export class Task {
   constructor(title) {
      this.title = title || ""
      this.completed = false
      this.timestamp = timestamp()
      this.placeId = ""
      this.id = gid()
   }
}

// Place model.
export class Place {
   constructor(name, street, number, district, city, state, country, zip) {
      this.name = name || ""
      this.street = street || ""
      this.number = number || ""
      this.district = district || ""
      this.city = city || ""
      this.state = state || ""
      this.country = country || ""
      this.zip = zip || ""
      this.id = gid()
   }
}