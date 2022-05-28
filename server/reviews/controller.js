const ReviewService = require('./service');
class ReviewController {
    async getByUser(req, res, next) {
        try {
            const { userID } = req.params;
            const reviews = await ReviewService.getByUser(userID);
            res.json({ reviews });
        } catch (err) {
            next(err)
        }
    }
    async getByMovie(req, res, next) {
        try {
            const { movieID } = req.params;
            const reviews = await ReviewService.getByMovie(movieID);
            res.json({ reviews });
        } catch (err) {
            next(err)
        }
    }
    async add(req, res, next) {
        try {
            const {movieID, text, recommendation,movieTitle,type } = req.body;
            const review = await ReviewService.add(req.user.id, movieID, text, recommendation,req.user.email,movieTitle,type);
            res.json({ review });
        } catch (err) {
            next(err)
        }
    }
    async remove(req, res, next) {
        try {
            const { reviewId } = req.params;
            await ReviewService.remove(reviewId)
            res.json({ Result: "Success" });
        } catch (err) {
            next(err)
        }
    }
    async getReportedReviews(req, res, next) {
        try {
            const reviews = await ReviewService.getReportedReviews();
            res.json({ reviews });
        } catch (err) {
            next(err)
        }
    }
}
module.exports = new ReviewController()