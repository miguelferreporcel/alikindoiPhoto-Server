/* import { ROLES } from "../models/Role.js" */
import User from "../models/User.js"

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({username: req.body.username})
  const email = await User.findOne({email: req.body.email})

  if (user) return res.status(400).json({message: `The user ${user.username} already exists `})
  if (email) return res.status(400).json({message: `The email ${email.email} already exists `})

  next()
}

/* export const checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i=0; i< req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({messagr: `Role ${req.body.roles[i]} does not exists`})
      }
    }
  }
  next()
} */