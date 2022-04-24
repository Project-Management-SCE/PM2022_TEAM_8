const Watchlist = require('./model')
const ApiError = require('../exceptions/api-error')
const WatchlistDto = require('./dto')

class WatchlistService {

    async add(user, id, genre_ids, overview, poster_path, release_date, title) {
        const newMovie = await new Watchlist(
            {
                userID: user.id,
                id,
                genre_ids,
                overview,
                poster_path,
                release_date,
                title
            })

        await newMovie.save()
        return 'Success'
    }
    async get(user) {
        const watchlist = await Watchlist.find({ userID: user.id })
        return watchlist.map(movie => new WatchlistDto(movie.userID, movie.id, movie.genre_ids, movie.overview, movie.poster_path, movie.release_date, movie.title))
    }
    async remove(user, id) {
        const movie = await Watchlist.findOne({ userID: user.id, id });
        if (!movie) {
            throw ApiError.BadRequest("Movie not in watchlist!")
        }
        await movie.deleteOne({ userID: user.id, id })
        return "Movie removed from watchlist"
    }


}

module.exports = new WatchlistService();