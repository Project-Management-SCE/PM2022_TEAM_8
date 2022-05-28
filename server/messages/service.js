const Message = require('./model')
const ApiError = require("../exceptions/api-error");
const MessageDto = require("./dto");

class MessageService {
    async sendMessage(email,subject,text) {
        const newMessage = await new Message(
             {
                email,
                subject,
                text
            })
        await newMessage.save()
        return 'Success'
    }

    async markClosed(id) {
        const message = await Message.findOne({ _id:id });
        if (!message) {
            throw ApiError.BadRequest("Could not find the request!")
        }
        message.status = 'closed';
        await message.save()
        return "Request closed"
    }
    async getMessages() {
        const messages = await Message.find({type:"Message"})
        return messages.map(message => new MessageDto(message._id,message.email,message.subject, message.text,message.status))
    }
}

module.exports = new MessageService();