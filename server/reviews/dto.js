
module.exports = class ReviewDto {
    userID;
    movieID;
    text;
    recommendation;
    type;
    movieTitle;
    userEmail;
    reviewID;
    constructor( userID,movieID,text,recommendation,movieTitle,type,userEmail,reviewID) {
        this.reviewID = reviewID;
        this.userID = userID;
        this.movieID = movieID;
        this.text = text;
        this.recommendation = recommendation;
        this.movieTitle = movieTitle;
        this.type = type;
        this.userEmail = userEmail;
    }
}

