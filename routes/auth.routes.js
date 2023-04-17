import {Router} from 'express'
import { register, login } from '../controllers/auth.controller.js'
import { checkDuplicateUsernameOrEmail, checkRoleExisted } from '../middlewares/verifySignup.js'

const router = Router()

router.post('/register', checkDuplicateUsernameOrEmail, checkRoleExisted, register)

router.post('/login', login)

export default router