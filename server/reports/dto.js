
module.exports = class ReportDto {
    reviewID;
    subject;
    text;
    reportedBy;
    constructor(reviewID,subject,text,reportedBy) {
        this.reviewID = reviewID;
        this.subject = subject;
        this.text = text;
        this.reportedBy = reportedBy;
    }
}
