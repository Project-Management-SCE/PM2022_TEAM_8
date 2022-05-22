const mongoose = require("mongoose");
module.exports = class ReportDto {
    userID;
    reviewID;
    subject;
    text;
    constructor(userID,reviewID,subject,text) {
        this.userID = userID;
        this.reviewID = reviewID;
        this.subject = subject;
        this.text = text;
    }
}
