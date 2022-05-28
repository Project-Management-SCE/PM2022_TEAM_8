const Review = require('./model')
const Report = require('../reports/model')
const ApiError = require('../exceptions/api-error')
const ReviewDto = require('./dto')
const ReportService = require('../reports/service')
class ReviewService {
    async getReportedReviews() {
        const reviewIds = await ReportService.getReportedReviewIds()
        const reviews = await Review.find({ _id: { $in: reviewIds } })
        return reviews.map(review => new ReviewDto(review.userID, review.movieID, review.text,review.recommendation,review.movieTitle,review.type,review.userEmail,review._id))
    }
    async add(userID, movieID, text, recommendation,email,movieTitle,type) {
        const checkExist = await Review.findOne({ userID, movieID })
        if (checkExist) {
            throw new ApiError(409, 'Oops! You already reviewed this!')
        }
        const newReview = await new Review(
            {
                userID,
                movieID,
                text,
                userEmail: email,
                recommendation,
                movieTitle,
                type
            })
        await newReview.save()
        return new ReviewDto(newReview.userID, newReview.movieID, newReview.text,newReview.recommendation,newReview.movieTitle,newReview.type,newReview.userEmail,newReview._id)
    }
    async getByUser(id) {
        const reviews = await Review.find({ userID: id })
        return reviews.map(review => new ReviewDto(review.userID, review.movieID, review.text,review.recommendation,review.movieTitle,review.type,review.userEmail,review._id))
    }
    async getByMovie(id) {
        const reviews = await Review.find({ movieID: id })
        return reviews.map(review => new ReviewDto(review.userID, review.movieID, review.text,review.recommendation,review.movieTitle,review.type,review.userEmail, review._id))
    }
    async remove(reviewId) {
        const review = await Review.findOne({ _id: reviewId })
        if (!review) {
            throw ApiError.BadRequest("Could not find the review!")
        }
        await Report.deleteMany({reviewID:review._id})
        await review.deleteOne({ _id: reviewId })
        return "Review removed from site"

    }
}

module.exports = new ReviewService();