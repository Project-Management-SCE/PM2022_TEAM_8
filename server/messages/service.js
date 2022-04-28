const Message = require('./model')
const mailer = require("../utils/mailer");
const ApiError = require("../exceptions/api-error");
const MessageDto = require("./dto");

class MessageService {
    async sendMessage(topic,email,text) {
        const newMessage = await new Message(
             {
                email,
                topic,
                text
            })
        await newMessage.save()
        return 'Success'
    }
    async sendReply(email, body) {
        await mailer.sendResponse(email, body)
        return "Reply sent"
    }

    async markClosed(id) {
        const movie = await Message.findOne({ _id:id });
        if (!movie) {
            throw ApiError.BadRequest("Could not find the request!")
        }
        movie.status = 'closed';
        await movie.save()
        return "Request closed"
    }
    async getMessages() {
        const messages = await Message.find({type:"Message"})
        return messages.map(message => new MessageDto(message._id,message.topic,message.email, message.text))
    }
}

module.exports = new MessageService();