// Colors.
const color = {
   RED: "\x1b[31m",
   GREEN: "\x1b[32m",
   YELLOW: "\x1b[33m",
   RESET: "\x1b[0m"
}

// Success.
export const SUCCESS = message => {
   return color.GREEN + message + color.RESET
}

// Warning.
export const WARNING = message => {
   return color.YELLOW + message + color.RESET
}

// Danger.
export const DANGER = message => {
   return color.RED + message + color.RESET
}