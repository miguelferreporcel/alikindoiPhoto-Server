import { ROLES } from "../models/Role.js"
import User from "../models/User.js"

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const existingUser = await User.findOne({username: req.body.username})
  const existingEmail = await User.findOne({email: req.body.email})

  if (existingUser) return res.status(400).json({message: `The user ${existingUser.username} already exists `})
  if (existingEmail) return res.status(400).json({message: `The email ${existingEmail.email} already exists `})

  next()
}

export const checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i=0; i< req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({message: `Role ${req.body.roles[i]} does not exists`})
      }
    }
  }
  next()
}