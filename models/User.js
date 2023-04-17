import { Schema, model } from "mongoose"


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 20
    },
    roles: [{
        ref: "Role", 
        type: Schema.Types.ObjectId
    }], 
    posts: [{
        ref: "Post", 
        type: Schema.Types.ObjectId
    }],
    refreshToken: String,    
}, {
    timestamps: true,
    versionKey: false
})

// Nos aseguramos que no se muestre el password
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
       delete returnedObject.password 
    }    
})

export default model('User', userSchema)