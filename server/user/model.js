const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            default: "Default First Name",
        },
        lastName: {
            type: String,
            default: "Default Last Name",
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
            default: "0"
        },
        address: {
            type: String,
            default: "חיים נחמן ביאליק 56, באר שבע, 84100"
        },
    }, { timestamps: true }
)
module.exports = mongoose.model("User", UserSchema)