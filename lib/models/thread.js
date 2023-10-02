import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    text: {
        type: String,
        required:true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Community',
        default: null
    },
    path: {
        type: String,
        default: null
    },
    created: {
        type: Date,
        default: Date.now()
    },
    parentId: {
        type: String,
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Thread'
    }]
})

export const Thread= mongoose.models?.threads || mongoose.model("threads", threadSchema)
