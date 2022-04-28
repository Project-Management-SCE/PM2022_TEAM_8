const messageService = require('./service');
class messageController {

    async sendMessage(req, res, next) {
        try {
            const {topic,email,text} = req.body;
            await messageService.sendMessage(topic,email,text);
            res.json("Submitted request successfully")
        } catch (err) {
            next(err)
        }
    }
    async sendReply(req, res, next) {
        try {
            const { email, body } = req.body
            const msg = await messageService.sendReply(email, body)
            res.json(msg)
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