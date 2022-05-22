
module.exports = class ReviewDto {
    userID;
    movieID;
    text;
    recommendation;
    constructor( userID,movieID,text,recommendation) {
        this.userID = userID;
        this.movieID = movieID;
        this.text = text;
        this.recommendation = recommendation;
    }
}

