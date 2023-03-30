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
    }]
    
}, {
    timestamps: true,
    versionKey: false
})

export default model('User', userSchema)