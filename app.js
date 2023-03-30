/**
 * Express es un framework web transigente, escrito en JavaScript y alojado dentro del entorno de ejecución NodeJS.
 * Este archivo configura express para el proyecto
 * Módulo fileUpload para subir archivos
 */

import express from 'express'
import fileUpload from 'express-fileupload'
import postsRoutes from './routes/post.routes.js'
import authRoutes from './routes/auth.routes.js'

// Crear variable __dirname
import { dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

// midlewares
app.use(express.json())
app.use(fileUpload({
    
    // almacena las imágenes en el directorio './upload'
    useTempFiles: true,
    tempFileDir: './upload'

}))

// routes
app.use(postsRoutes)
app.use(authRoutes)

// El server también servirá el client
app.use(express.static(join(__dirname, '../client/build')))

export default app 