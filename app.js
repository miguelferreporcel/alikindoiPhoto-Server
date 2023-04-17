/**
 * Express es un framework web transigente, escrito en JavaScript y alojado dentro del entorno de ejecución NodeJS.
 * Este archivo configura express para el proyecto
 * Módulo fileUpload para subir archivos
 */

import express from 'express'
import fileUpload from 'express-fileupload'
import postsRoutes from './routes/post.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

import { createRoles } from './libs/initialSetup.js'
import { logger } from './middlewares/logEvents.js'

import morgan from 'morgan'

const app = express()
createRoles()

// midlewares
app.use(morgan('dev'))
app.use(logger)
app.use(express.json())
app.use(fileUpload({
    
    // almacena las imágenes en el directorio './upload'
    useTempFiles: true,
    tempFileDir: './upload'

}))

// routes
app.use(postsRoutes)
app.use(authRoutes)
app.use(userRoutes)

export default app 