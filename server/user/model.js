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
            default:"Default First Name",
        },
        lastName: {
            type: String,
            default:"Default Last Name",
        },
        password: {
            type: String,
            required: true
        },
        type:{
            type:String,
            default:"User"
        },
    }, {timestamps: true}
)
module.exports = mongoose.model("User", UserSchema)