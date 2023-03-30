/**
 * dotenv es un módulo de dependencia cero que carga variables de entorno desde un archivo .env en process.env. 
 * Almacenamiento de configuración en el entorno separado del código
 * Si no existen las variables de entorno se asignan valores por defecto par su ejecución
 */

import dotenv from 'dotenv'
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/testdb"
export const PORT = process.env.port || 4000

export const SECRET = process.env.SECRET