const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        movieID: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            required: true
        },
        recommendation: {
            type: Boolean,
            required: true
        },
    },
)
module.exports = mongoose.model("Review", ReviewSchema)



