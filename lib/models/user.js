import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    bio: {
        type: String,
        default:""
    },
    profile_photo: {
        type: String,
        default:""
    },
    threads: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Thread'
    },
    onboarded: {
        type: Boolean,
        default: false,
    }
})

export const User= mongoose.models.users || mongoose.model("users", userSchema)