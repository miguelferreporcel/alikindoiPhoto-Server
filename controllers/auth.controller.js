import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config.js"
import Role from "../models/Role.js"


export const signUp = async (req, res) => {
  const {username, email, password, roles} = req.body

  const salt = 10
  const passwordHash = await bcrypt.hash(password, salt)

  const newUser = new User({
    username,
    email,
    password: passwordHash
  })

  if(roles) {
    const foundRoles = await Role.find({name: {$in: roles}})
    newUser.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({name: 'user'})
    newUser.roles = [role._id]
  }

  const savedUser = await newUser.save()
  console.log(savedUser) 
  
  const token = jwt.sign({id: savedUser._id}, JWT_SECRET, {
    expiresIn: 86400 // 24 horas
  })

  res.status(200).json({token})

}

export const signIn = async (req, res) => {
  res.json('signIn')
}