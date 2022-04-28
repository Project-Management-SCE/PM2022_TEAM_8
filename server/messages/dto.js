module.exports = class MessageDto {
    email;
    topic
    text;
    status;
    constructor(email,topic,text,status) {
        this.topic = topic;
        this.email = email;
        this.text = text;
        this.status = status;
    }
}