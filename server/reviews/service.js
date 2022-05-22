const Review = require('./model')
const Report = require('../reports/model')
const ApiError = require('../exceptions/api-error')
const ReviewDto = require('./dto')

class ReviewService {

    async add(userID, movieID, text, recommendation) {
        const checkExist = await Review.findOne({ userID: userID.id, movieID: movieID })
        if (checkExist) {
            throw new ApiError(409, 'Oops! You already reviewed this!')
        }
        const newReview = await new Review(
            {
                userID: userID.id,
                movieID,
                text,
                recommendation,
            })
        await newReview.save()
        return 'Success'
    }
    async get(id) {
        const reviews = await Review.find({ userID: id })
        return reviews.map(review => new ReviewDto(review.userID, review.movieID, review.text,review.recommendation))
    }
    async remove(userID, movieID) {
        const review = await Review.findOne({ userID: userID, movieID:movieID });
        if (!review) {
            throw ApiError.BadRequest("Could not find the review!")
        }
        await Report.remove({userID: userID, reviewID:review._id})
        await review.deleteOne({ userID: userID, movieID:movieID })
        return "Review removed from site"

    }
}

module.exports = new ReviewService();