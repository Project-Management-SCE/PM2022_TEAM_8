const Report = require('./model')
const ApiError = require('../exceptions/api-error')
const ReportDto = require('./dto')

class ReportService {
    async getAll() {
        const reports = await Report.find({ type: "Report" })
        return reports.map(report => new ReportDto(report.userID, report.reviewID, report.subject, report.text))
    }
    async get(id) {
        const reports = await Report.find({ reviewID: id })
        return reports.map(report => new ReportDto(report.userID, report.reviewID, report.subject, report.text))
    }

    async report(userID, reviewID, subject, text) {
        const checkExist = await Report.findOne({ userID: userID.id, reviewID: reviewID.reviewId })
        if (checkExist) {
            throw new ApiError(409, 'Cannot report the same content twice!')
        }
        const newReport = await new Report(
            {
                userID: userID,
                reviewID: reviewID,
                subject,
                text
            })
        await newReport.save()
        return 'Success'
    }
}

module.exports = new ReportService();