/**
 * Mongoose es una biblioteca de programación orientada a objetos de JavaScript que crea una conexión entre MongoDB y el entorno de tiempo de ejecución de JavaScript de Node.js.
 * db.js proporciona la conexión con la base de datos no relacional MongoDB
 * Si hay conexión muestra por consola el mensaje de conexión, si no el mensaje con el error
 */

import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

export async function connectDB() {
    try{
        mongoose.set("strictQuery", false);    
        const db = await mongoose.connect(MONGODB_URI)  
        console.log('Connected to ', db.connection.name)  
    }catch (error) {
        console.log(error)
    }   
}
