import User from "../models/User.js"
import bcrypt from 'bcryptjs'


export const createUser = async (req, res) => {
  const {username, email, password/* , roles */} = req.body
  try {
    // Confirm data
    if (!username ||!email || !password ) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const userDupli = await User.findOne({username: req.body.username})
    const emailDupli = await User.findOne({email: req.body.email})
    if (userDupli) return res.status(400).json({message: `The user ${userDupli.username} already exists `})
    if (emailDupli) return res.status(400).json({message: `The email ${emailDupli.email} already exists `})

    // Hash password 
    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)  

    // Create new user 
    const newUser = new User({
      username,
      email,
      password: passwordHash
    })

    // store new user
    const savedUser = await newUser.save()
    console.log(savedUser)

    if (newUser) { //created 
      res.status(201).json({ message: `New user ${username} created`, newUser })
      
    } else {
      res.status(400).json({ message: 'Invalid user data received' })
    }
  } catch (error) {
    console.error(error)
  }
}

// listar (find() -> obtener) todos los usuarios. 
export const getUsers =  async (req, res) => {
  try {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
      return res.status(400).json({ message: 'No users found' })
    }
    res.json(users) 
  } catch (error) {
    console.error(error)
  }   
}

// actualizar usuario (User.findByIdAndUpdate) por ID (_id: req.params.id). Devuelve el objeto nuevo (new: true)
export const updateUser =  async (req, res) => {

  try{
    const { username, email, password } = req.body
    
    // Hash password 
    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt) 
     

    // Create updateUser 
    const updateUser = {
      username,
      email,
      password: passwordHash
    }

    console.log(updateUser)

    // Store user
    const userUpdated = await User.findByIdAndUpdate({ _id: req.params.id }, updateUser, { new: true})
    return res.json(userUpdated)
  }catch (error){
    return res.status(500).json({message: error.message})
  } 
}

// eliminar user (User.findByIdAndDelete) por ID (req.params.id)
export const deleteUser =  async(req, res) => {
  try {
    const userRemove = await User.findByIdAndDelete(req.params.id)

    // si no existe el usuario envía mensaje de estado 404
    if (!userRemove) return res.json('El usuario no existe')
    return res.json('usuario ' + userRemove.username + ' eliminado')
  } catch (error) {
    console.error(error)
  }  
}