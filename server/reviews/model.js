const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true
        },
        movieTitle: {
            type: String,
            required: true
        },
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
        type: {
            type: String,
            required: true
        },
    },
)
module.exports = mongoose.model("Review", ReviewSchema)



