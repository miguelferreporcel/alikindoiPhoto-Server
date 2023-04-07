import { Router } from "express"
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/user.controller.js"
import { verifyToken, isAdmin } from '../middlewares/verifyAuth.js'

const router = Router()

router.get('/users', /* isAdmin, */ getUsers)

router.post('/users', /* isAdmin, */ createUser)

router.put('/users/:id', updateUser)

router.delete('/users/:id', /* isAdmin, */ deleteUser)

export default router


/* router.get('/users', [
  verifyAuth.verifyToken, 
  verifyAuth.isAdmin
], getUsers)
router.post('/users', [
  verifyAuth.verifyToken, 
  verifyAuth.isAdmin, 
  verifySignup.checkRoleExisted
], createUser)
router.put('/users/:id', [
  verifyAuth.verifyToken, 
  verifyAuth.isAdmin
], updateUser)
router.delete('/users/:id', [
  verifyAuth.verifyToken, 
  verifyAuth.isAdmin
], deleteUser) */