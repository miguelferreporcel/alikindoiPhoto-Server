/**
 *  importa v2 (versión del módulo) de la librería cloudinary, propiedad uploader y método upload()
 *  cloudinary es un servicio en la nube para almacenar imágenes y videos
 *  propiedad uploader permite llamar al método upload() que permitirá subir los archivos a cloudinary
 * */ 
import { v2 as cloudinary } from 'cloudinary'

// configuración de cloudynary previa creación de cuenta en el servicio cloudinary
cloudinary.config({
    cloud_name: "ddd7t4oyt",
    api_key: "235172762446161",
    api_secret: "_NySEHg6vREFH_7KVNkfyv33miA"    
})

// subir imágenes a cloudinary
export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'posts'
    })    
}

// eliminar imágenes de cloudinary por id -> cloudinary.uploader.destroy(id)
export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}