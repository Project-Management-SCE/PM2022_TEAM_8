module.exports = class WatchlistDto {
    userID;
    id;
    genre_ids;
    overview;
    poster_path;
    release_date;
    title;
    type;
    constructor(userID,id,genre_ids,overview,poster_path,release_date,title,type) {
        this.userID = userID;
        this.id = id;
        this.genre_ids = genre_ids;
        this.overview = overview;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.title = title;
        this.type = type;
    }
}