import User from "../models/User.js"
import Role from "../models/Role.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS, JWT_REFRESH } from "../config/config.js"



export const register = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body

    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      roles
    })

    if(roles) {
      const foundRoles = await Role.find({name: {$in: roles}})
      newUser.roles = foundRoles.map(role => role._id) 
    } else {
      const role = await Role.findOne({name: 'user'})
      newUser.roles = [role._id]
    } 

    const savedUser = await newUser.save()
    /* console.log(savedUser) */
    
    const accessToken = jwt.sign(
      { id: savedUser._id }, 
      JWT_ACCESS, 
      { expiresIn: '15m' }
    )

    res.status(200).json({accessToken})
  } catch (error) {
    console.error(error)
  }
  

}

export const login = async (req, res) => {
  try {
    const userFound = await User.findOne({email: req.body.email}).populate('roles')

  if(!userFound) return res.status(400).json({message: 'Invalid email or password'})
  
  const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
  }
  const matchPassword = await comparePassword(req.body.password, userFound.password)
  if(!matchPassword) return res.status(400).json({message: 'Invalid email or password'})

  const accessToken = jwt.sign(
    { 
      id: userFound._id,
      username: userFound.username
     }, 
    JWT_ACCESS, 
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { 
      id: userFound._id,
      username: userFound.username
     },
    JWT_REFRESH,
    { expiresIn: '7d' }
  )

  // Saving refreshToken with current user
  userFound.refreshToken = refreshToken
  const result = await userFound.save()

  // Create secure cookie with refresh token 
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server 
    /* secure: true, //https */
    sameSite: 'Lax', //cross-site cookie 
    maxAge: 24 * 60 * 60 * 1000 //cookie expires 1 day
  })
  
  res.status(200).json({message: 'Successfully Logged In', accessToken, userFound, /* refreshToken */})
  } catch (error) {
    console.error({message: 'No login success'}, error)
  }
    
}