
module.exports = class ReviewDto {
    userID;
    movieID;
    text;
    recommendation;
    type;
    movieTitle;
    constructor( userID,movieID,text,recommendation,movieTitle,type) {
        this.userID = userID;
        this.movieID = movieID;
        this.text = text;
        this.recommendation = recommendation;
        this.movieTitle = movieTitle;
        this.type = type;
    }
}

