/**
 * Definición de las rutas (URL) del proyecto y su comportamiento,
 * a través de la función Router y los métodos del CRUD que se importan del controller.
 */

import {Router} from 'express'
import {getPosts, createPosts, updatePosts, deletePosts, getPost} from '../controllers/post.controllers.js'

const router = Router()


// Devuelve arreglo de publicaciones
router.get('/posts', getPosts)

// Crear un nuevo post
router.post('/posts', createPosts)

// Actualizar un post a través de un id proporcionado
router.put('/posts/:id', updatePosts)

// Eliminar un post a través de un id proporcionado
router.delete('/posts/:id', deletePosts)

// Devuelve una única publicación
router.get('/posts/:id', getPost) 


export default router