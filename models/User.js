import { Schema, model, SchemaType} from "mongoose"


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role", 
        type: Schema.Types.ObjectId
    }], 
    posts: [{
        ref: "Post", 
        type: Schema.Types.ObjectId
    }]
    
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