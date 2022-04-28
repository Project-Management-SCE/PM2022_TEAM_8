const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema(
    {
        topic:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        status:{
            type: String,
            required: true,
            default: 'open',
        }
    }, { timestamps: true }
)
module.exports = mongoose.model("Message", MessageSchema)