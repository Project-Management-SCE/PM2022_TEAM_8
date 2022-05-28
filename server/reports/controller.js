const ReportService = require('./service');
class ReportController {
    async get(req, res, next) {
        try {
            const { id } = req.params;
            const reports = await ReportService.get(id);
            res.json({ reports });
        } catch (err) {
            next(err)
        }
    }
    async report(req, res, next) {
        try {
            const { reviewId, subject, text } = req.body;
            await ReportService.report(reviewId, subject, text,req.user.email);
            res.json({ Result: "Success" });
        } catch (err) {
            next(err)
        }
    }
}
module.exports = new ReportController()