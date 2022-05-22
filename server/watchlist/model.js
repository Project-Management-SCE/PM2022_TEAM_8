const mongoose = require("mongoose")

const WatchListSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        id: {
            type: Number,
            required: true,
        },
        genre_ids: {
            type: [String],

        },
        overview: {
            type: String,
            required: true
        },
        poster_path: {
            type: String
        },
        release_date: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            required: true
        },
    },
)
module.exports = mongoose.model("Watchlist", WatchListSchema)



