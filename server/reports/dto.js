
module.exports = class ReportDto {
    userID;
    reviewID;
    subject;
    text;
    userEmail;
    movieTitle;
    constructor(userID,reviewID,subject,text,userEmail,movieTitle) {
        this.movieTitle = movieTitle;
        this.userEmail = userEmail;
        this.userID = userID;
        this.reviewID = reviewID;
        this.subject = subject;
        this.text = text;
    }
}
