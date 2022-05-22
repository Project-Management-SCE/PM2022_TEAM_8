const ReviewService = require('./service');
class ReviewController {
    async get(req, res, next) {
        try {
            const { id } = req.params;
            const reviews = await ReviewService.get(id);
            res.json({ reviews });
        } catch (err) {
            next(err)
        }
    }
    async add(req, res, next) {
        try {
            const { userID, movieID, text, recommendation } = req.body;
            await ReviewService.add(userID, movieID, text, recommendation);
            res.json({ Result: "Success" });
        } catch (err) {
            next(err)
        }
    }
    async remove(req, res, next) {
        try {
            const { userID, movieID } = req.params;
            await ReviewService.remove(userID, movieID)
            res.json({ Result: "Success" });
        } catch (err) {
            next(err)
        }
    }
}
module.exports = new ReviewController()