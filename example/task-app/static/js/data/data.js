// Load or create database.
const load = () => {
   // Tasks.
   env.tasks = JSON.parse(localStorage.getItem("tasks"))
   if (env.tasks == null) {
      env.tasks = []
      localStorage.setItem("tasks", JSON.stringify(env.tasks))
   }
   env.selectedTask = null

   // Places.
   env.places = JSON.parse(localStorage.getItem("places"))
   if (env.places == null) {
      env.places = []
      localStorage.setItem("places", JSON.stringify(env.places))
   }
   env.selectedPlace = null
}

// Clear database.
const clear = () => {
   // Tasks.
   env.tasks = []
   localStorage.setItem("tasks", JSON.stringify(env.tasks))

   // Places.
   env.places = []
   localStorage.setItem("places", JSON.stringify(env.places))
}

// Get task (READ).
const getTask = async id => {
   let result = null
   for (let i = 0; i < env.tasks.length; i++) {
      if (env.tasks[i].id == id) {
         result = env.tasks[i]
         break
      }
   }
   return result
}

// Save task (CREATE).
const saveTask = async task => {
   if (task) {
      env.tasks.push(task)
      localStorage.setItem("tasks", JSON.stringify(env.tasks))
      return true
   }
   else {
      return false
   }
}

// Remove task (DELETE).
const removeTask = async id => {
   for (let i = 0; i < env.tasks.length; i++) {
      if (env.tasks[i].id == id) {
         env.tasks.splice(i, 1)
         localStorage.setItem("tasks", JSON.stringify(env.tasks))
         return true
      }
   }
   return false
}

// Update task (UPDATE).
const updateTask = async task => {
   for (let i = 0; i < env.tasks.length; i++) {
      if (env.tasks[i].id == task.id) {
         env.tasks[i] = task
         localStorage.setItem("tasks", JSON.stringify(env.tasks))
         return true
      }
   }
   return false
}

// Get place (READ).
const getPlace = async id => {
   let result = null
   for (let i = 0; i < env.places.length; i++) {
      if (env.places[i].id == id) {
         result = env.places[i]
         break
      }
   }
   return result
}

// Save place (CREATE).
const savePlace = async place => {
   if (place) {
      env.places.push(place)
      localStorage.setItem("places", JSON.stringify(env.places))
      return true
   }
   else {
      return false
   }
}

// Remove place (DELETE).
const removePlace = async id => {
   for (let i = 0; i < env.places.length; i++) {
      if (env.places[i].id == id) {
         env.places.splice(i, 1)
         localStorage.setItem("places", JSON.stringify(env.places))
         return true
      }
   }
   return false
}

// Update place (UPDATE).
const updatePlace = async place => {
   for (let i = 0; i < env.places.length; i++) {
      if (env.places[i].id == place.id) {
         env.places[i] = place
         localStorage.setItem("places", JSON.stringify(env.places))
         return true
      }
   }
   return false
}

export const data = {
   load: load,
   clear: clear,
   getTask: getTask,
   saveTask: saveTask,
   removeTask: removeTask,
   updateTask: updateTask,
   getPlace: getPlace,
   savePlace: savePlace,
   removePlace: removePlace,
   updatePlace: updatePlace
}