const Report = require('./model')
const ApiError = require('../exceptions/api-error')
const ReportDto = require('./dto')

class ReportService {
    async getReportedReviewIds() {
        const reports = await Report.find({})
        let reviewIds = reports.map(report => report.reviewID)
        const uniqueReviewIds = new Set(reviewIds)
        reviewIds = [...uniqueReviewIds]
        console.log(reviewIds);
        return reviewIds

    }
    async get(id) {
        const reports = await Report.find({ reviewID: id })
        return reports.map(report => new ReportDto(report.reviewID, report.subject, report.text,report.reportedBy))
    }

    async report(reviewID, subject, text,reportedBy) {
        const checkExist = await Report.findOne({reviewID,reportedBy })
        if (checkExist) {
            throw new ApiError(409, 'Cannot report the same content twice!')
        }
        const newReport = await new Report(
            {
                reviewID,
                subject,
                text,
                reportedBy
            })
        await newReport.save()
        return newReport
    }
}

module.exports = new ReportService();