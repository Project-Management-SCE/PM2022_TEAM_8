const messageService = require('./service');
const mailer = require("../utils/mailer");

class messageController {

    async sendMessage(req, res, next) {
        try {
            const {email,subject,text} = req.body;
            await messageService.sendMessage(email,subject,text);
            res.json("Submitted request successfully")
        } catch (err) {
            next(err)
        }
    }
    async sendReply(req, res, next) {
        try {
            const { email, text } = req.body
            await mailer.sendResponse(email, text)
            res.json({"Success": "Email sent"})
        } catch (err) {
            next(err);
        }
    }
    async markClosed(req, res, next) {
        try {
            const {id} = req.body;
            await messageService.markClosed(id)
            res.json("Request marked as closed!");
        } catch (err) {
            next(err)
        }
    }
    async getMessages(req, res, next) {
        try {
            const messages = await messageService.getMessages();
            res.json({messages})
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new messageController()