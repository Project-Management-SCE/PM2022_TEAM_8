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
    async getAll(req, res, next) {
        try {
            const reports = await ReportService.getAll();
            res.json({ reports });
        } catch (err) {
            next(err)
        }
    }
    async report(req, res, next) {
        try {
            const { userID, reviewID, subject, text } = req.body;
            await ReportService.report(userID, reviewID, subject, text);
            res.json({ Result: "Success" });
        } catch (err) {
            next(err)
        }
    }
}
module.exports = new ReportController()