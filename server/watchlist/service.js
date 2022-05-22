const Watchlist = require('./model')
const ApiError = require('../exceptions/api-error')
const WatchlistDto = require('./dto')

class WatchlistService {

    async add(user, id, genre_ids, overview, poster_path, release_date, title,type) {
        const checkExist = await Watchlist.findOne({ userID: user.id, id: id })
        if (checkExist) {
            throw new ApiError(409, 'Movie already in watchlist')
        }
        const newMovie = await new Watchlist(
            {
                userID: user.id,
                id,
                genre_ids,
                overview,
                poster_path,
                release_date,
                title,
                type
            })
        await newMovie.save()
        return 'Success'
    }
    async get(id) {
        const watchlist = await Watchlist.find({ userID: id })
        return watchlist.map(movie => new WatchlistDto(movie.userID, movie.id, movie.genre_ids, movie.overview, movie.poster_path, movie.release_date, movie.title,movie.type))

    }
    async remove(user, id) {
        const movie = await Watchlist.findOne({ userID: user, id });
        if (!movie) {
            throw ApiError.BadRequest("Movie not in watchlist!")
        }
        await movie.deleteOne({ userID: user, id })
        return "Movie removed from watchlist"

    }
}

module.exports = new WatchlistService();