const WatchlistService = require('./service');
class WatchlistController {
    async get(req, res, next) {
        try {
            const {user} = req.body;
            const watchlist = await WatchlistService.get(user.id);
            res.json({watchlist});
        } catch (err) {
            next(err)
        }
    }

    async add(req, res, next) {
        try {
            const {user,id,genre_ids,overview,poster_path,release_date,title} = req.body;
            await WatchlistService.add(user,id,genre_ids,overview,poster_path,release_date,title);
            res.json({Result:"Success"});
        } catch (err) {
            next(err)
        }
    }

    async remove(req, res, next) {
        try {
            const {user, id} = req.body;
            await WatchlistService.remove(user, id)
            res.json({Result:"Success"});
        } catch (err) {
            next(err)
        }
    }


}
module.exports = new WatchlistController()