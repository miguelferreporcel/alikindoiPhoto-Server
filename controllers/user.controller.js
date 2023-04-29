import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'


export const createUser = async (req, res) => {
  const {username, email, password , roles } = req.body
  try {
    // Confirm data
    if (!username ||!email || !password ) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    
    // Hash password 
    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)  

    // Create new user 
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
      const users = await User.find()
          .populate("roles", "name")
          .populate("posts", "title")
          .select("-password")
          .lean();

      // If no users
      if (!users?.length) {
          return res.status(400).json({ message: "No users found" });
      }
      // Map over users array and replace role ID with role name
      const usersWithRoleNames = users.map((user) => {
          const roles = user.roles.map((role) => role.name);
          return { ...user, roles };
      });

      res.json(usersWithRoleNames);
  } catch (error) {
    console.error(error)
  }   
}

// actualizar usuario (User.findByIdAndUpdate) por ID (_id: req.params.id). Devuelve el objeto nuevo (new: true)
export const updateUser =  async (req, res) => {

  try{
    const { username, email, password, roles } = req.body
    
    // Hash password 
    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt) 
     

    // Create updateUser 
    const updateUser = {
      username,
      email,
      password: passwordHash,
      roles
    }

    console.log('updateUser:' + updateUser.username)

    // Store user
    const userUpdated = await User.findByIdAndUpdate({ _id: req.params.id }, updateUser, { new: true})
    return res.json({message: 'El usuario ' + userUpdated.username + ' se ha actualizado'})
  }catch (error){
    return res.status(500).json('El usuario ' + updateUser.username + ' no se ha actualizado' + {message: error.message})
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

// listar un único usuario por ID (Post.findById(req.params.id))
export const getUser = async(req, res) => {
  try{
      const userFound = await User.findById(req.params.id)
      if (!userFound) return res.sendStatus(404).json({message: 'User not found'})
      return res.json(userFound).status(200)    
  }catch (error){
      return res.status(500).json({message: error.message})        
  }
}


