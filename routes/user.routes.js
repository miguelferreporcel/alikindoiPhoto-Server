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

/* const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/users')
    .get(verifyRoles(ROLES_LIST.admin), usersController.getUsers)
    .post(verifyRoles(ROLES_LIST.admin), usersController.createUser);

router.route('/users/:id')
    .get(verifyRoles(ROLES_LIST.admin), usersController.getUser);
    .put(verifyRoles(ROLES_LIST.admin), usersController.updateUser);
    .delete(verifyRoles(ROLES_LIST.admin), usersController.deleteUser) */