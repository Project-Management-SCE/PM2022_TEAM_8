const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        subject:{
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