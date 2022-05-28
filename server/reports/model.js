const mongoose = require("mongoose")

const ReportSchema = new mongoose.Schema(
    {
        reviewID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        },
        subject: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true
        },
        reportedBy: {
            type: String,
            required: true
        },
    },
)
module.exports = mongoose.model("Report", ReportSchema)



