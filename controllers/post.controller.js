/**
 * El controller almacena todas las funciones necesarias para el proyecto
 * con try catch capturamos los errores si ocurre un malfuncionamiento
 * con return res.status devolvemos un codigo de estado (204, 404, 500 ...)
 * módulo fs para manejar manejo de archivos, p.ej. para eliminar fs.remove
 */

import Post from '../models/Post.js'
import { uploadImage, deleteImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

// listar (find() -> obtener) todos los posts. 
export const getPosts = async (req, res) => {
    try{
        const postsList = await Post.find()
        res.send(postsList) 
    }catch (error){
        console.error(error.message)
        return res.status(500).json({message: error.message})
    }    
}

// crear posts. req.body almacena los datos introducidos por el cliente y se asignan a title, description e image
export const createPosts = async (req, res) => {
    try{
        const {title, description} = req.body
        let image
        
        /**
         * si hay imágenes dentro de la propiedad req.files...(req.files.image)
         * propiedad tempFile.Path indica la ruta donde está la imágen para subirla posteriormente a cloudinary
         */
        if (req.files?.image){
            // almacenar imágen en...
            const result = await uploadImage(req.files.image.tempFilePath)
            // guardar de  la imagen ... en la variable image
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            // Una vez almacenadas en cloudinary elimina las imágenes de ./upload (fs.remove)
            await fs.remove(req.files.image.tempFilePath)
        }
        // new Post -> objeto que contiene los datos introducidos desde el cliente y que se guarda ('save()') en BD
        const newPost = new Post({title, description, image})
        await newPost.save()
        return res.json(newPost)
    }catch (error){
        console.error(error.message)
        return res.status(500).json({message: error.message})
    }     
} 

// actualizar posts (Post.updateOne) por ID (_id: req.params.id). Devuelve el objeto nuevo (new: true)
export const updatePosts = async(req, res) => {
    try{
        const postUpdate = await Post.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true})
        return res.json(postUpdate)
    }catch (error){
        console.error(error.message)
        return res.status(500).json({message: error.message})
    }  
}

// eliminar posts (Post.findByIdAndDelete) por ID (req.params.id)
export const deletePosts = async(req, res) => {
    try{        
        const postRemove = await Post.findByIdAndDelete(req.params.id)

        // si no existe el post envía mensaje de estado 404
        if (!postRemove) return res.sendStatus(404)

        // si existe el post contiene imágen y public_id ...
        if (postRemove.image.public_id){
            // eliminar imágenes de cloudinary por public_id
            await deleteImage(postRemove.image.public_id)
        }        
        return res.sendStatus(204)
    }catch (error){        
        console.error(error.message)
        return res.status(500).json({message: error.message})
    }
}

// listar un único post por ID (Post.findById(req.params.id))
export const getPost = async(req, res) => {
    try{
        const postFound = await Post.findById(req.params.id)
        if (!postFound) return res.sendStatus(404)
        return res.json(postFound)    
    }catch (error){        
        console.error(error.message)
        return res.status(500).json({message: error.message})        
    }
}