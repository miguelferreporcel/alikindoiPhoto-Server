/**
 * Archivo principal del proyecto y que contiene la aplicación, conexióna BD y puerto de conexión.
 * Encargado de arrancar el código
 */

import { connectDB }from './config/db.js'
import { PORT } from './config/config.js'
import app from './app.js'

connectDB()

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
