import { Router } from "express"
import { createUser, deleteUser, getUsers, updateUser, getUser } from "../controllers/user.controller.js"
import { verifyToken, isAdmin } from '../middlewares/verifyAuth.js'
import { checkRoleExisted } from '../middlewares/verifySignup.js'
import { checkDuplicateUsernameOrEmail } from '../middlewares/verifySignup.js'

const router = Router()

router.get('/users', /* verifyToken, isAdmin, */ getUsers)

router.post('/users', /* verifyToken, isAdmin, */ /* checkRoleExisted, */ checkDuplicateUsernameOrEmail, createUser)

router.put('/users/:id', /* verifyToken, checkRoleExisted, */ /* checkDuplicateUsernameOrEmail, */ updateUser)

router.delete('/users/:id', /* verifyToken, isAdmin, */ deleteUser)

// Devuelve un único usuario
router.get('/users/:id', /* verifyToken, */ getUser) 

export default router