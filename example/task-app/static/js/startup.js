// Navigation items.
const _items = document.querySelectorAll("nav ul li a")

const items = {
   "dashboard": _items[0],
   "tasks": _items[1],
   "places": _items[2],
   "settings": _items[3]
}

const selectItem = async item_name => {
   items[item_name].classList.add("selected")
}

const unselectItem = async item_name => {
   items[item_name].classList.remove("selected")
}

// Theme mode.
const body = document.querySelector("body")
const modeText = document.querySelector(".mode-text")
const modeSwitch = document.querySelector(".mode-switch")

let mode = localStorage.getItem("mode")

if (mode == "dark") {
   body.classList.add("dark")
   modeText.innerHTML = "Light Mode"
}

modeSwitch.addEventListener("click", () => {
   body.classList.toggle("dark")

   if (body.classList.contains("dark")) {
      modeText.innerHTML = "Light Mode"
      localStorage.setItem("mode", "dark")
   }
   else {
      modeText.innerHTML = "Dark Mode"
      localStorage.setItem("mode", "light")
   }
})

export const startup = () => {
   env.selectItem = selectItem
   env.unselectItem = unselectItem
}