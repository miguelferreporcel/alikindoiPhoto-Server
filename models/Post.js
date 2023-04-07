// Definición de la estructura y propiedades de los datos de una publicación ('Post') para su almacenmiento y uso

// Definición de la estructura y propiedades de los datos de una publicación ('Post') para su almacenmiento y uso

import { Schema, model} from "mongoose"

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        url: String,
        public_id: String
    }, 
    user: [{
        ref: "User", 
        type: Schema.Types.ObjectId
    }]
}, {    
    timestamps: true,
    versionKey: false
        
})

export default model('Post', postSchema)