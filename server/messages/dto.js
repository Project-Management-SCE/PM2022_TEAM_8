module.exports = class MessageDto {
    ticketID;
    email;
    subject;
    text;
    status;
    constructor(ticketID,email,subject,text,status) {
        this.ticketID = ticketID
        this.email = email
        this.subject = subject
        this.text = text
        this.status = status
    }
}