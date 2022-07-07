// Identifier generator.
export const gid = () => {
   const mask = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
   return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () => mask[Math.random() * mask.length | 0])
}

// Timestamp generator.
export const timestamp = date => {
   if (date)
      return new Date(date).toISOString()
   else
      return new Date().toISOString()
}