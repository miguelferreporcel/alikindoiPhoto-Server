/**
 * El controller almacena todas las funciones necesarias para el proyecto
 * con try catch capturamos los errores si ocurre un malfuncionamiento
 * con return res.status devolvemos un codigo de estado (204, 404, 500 ...)
 */

// Importa el modelo de User
import User from '../models/User.js'

// Importa el componente para encriptar el password
import bcrypt from 'bcryptjs'

// listar (find() -> obtener) todos los usuarios. 
export const getUsers = async (req, res) => {
  try{
      const usersList = await User.find()
      res.send(usersList) 
  }catch (error){
      console.error(error.message)
      return res.status(500).json({message: error.message})
  }    
}

// crear nuevo usuario. req.body almacena los datos introducidos por el cliente y se asignan a username y password
export const createUsers = async (req, res) => {
  try{
      const {username, password} = req.body

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      // new User -> objeto que contiene los datos introducidos desde el cliente y que se guarda ('save()') en BD
      const newUser = new User({username, passwordHash})
      await newUser.save()
      return res.json(newUser)
  }catch (error){
      console.error(error.message)
      return res.status(500).json({message: error.message})
  }     
} 