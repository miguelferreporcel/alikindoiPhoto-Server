import {Router} from 'express'
import { getUsers, createUsers } from '../controllers/user.controller.js'

const router = Router()

// Devuelve arreglo de usuarios
router.get('/users', getUsers)

// Crear un nuevo usuario
router.post('/users', createUsers)

export default router