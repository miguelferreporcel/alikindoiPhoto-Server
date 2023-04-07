import {Router} from 'express'
import { signUp, signIn } from '../controllers/auth.controller.js'
import { verifySignup } from '../middlewares/index.js'

const router = Router()

router.post('/signup', verifySignup.checkDuplicateUsernameOrEmail, signUp)

router.post('/signin', signIn)

export default router

/* router.post('/signup', [
  verifySignup.checkDuplicateUsernameOrEmail,
  verifySignup.checkRoleExisted], 
  signUp
) */