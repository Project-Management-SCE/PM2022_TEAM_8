const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        isBlocked:{
            type: Boolean,
            default:false
        },
        blockedUntil:{
            type: Date,
            default: null
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            default: "John",
        },
        lastName: {
            type: String,
            default: "Doe",
        },
        password: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "User"
        },
        phone: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
    }, { timestamps: true }
)
module.exports = mongoose.model("User", UserSchema)