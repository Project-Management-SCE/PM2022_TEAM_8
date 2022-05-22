const WatchlistService = require('./service');
class WatchlistController {
    async get(req, res, next) {
        try {
            const { id } = req.params;
            const watchlist = await WatchlistService.get(id);
            res.json({ watchlist });
        } catch (err) {
            next(err)
        }

    }

    async add(req, res, next) {
        try {
            const { user, id, genre_ids, overview, poster_path, release_date, title,type } = req.body;
            await WatchlistService.add(user, id, genre_ids, overview, poster_path, release_date, title,type);
            res.json({ Result: "Success" });
        } catch (err) {
            next(err)
        }

    }

    async remove(req, res, next) {
        try {
            const { userID, watchlistID } = req.params;
            await WatchlistService.remove(userID, watchlistID)
            res.json({ Result: "Success" });
        } catch (err) {
            next(err)
        }
    }
}
module.exports = new WatchlistController()