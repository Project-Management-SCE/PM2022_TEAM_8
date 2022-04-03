const nodemailer = require('nodemailer');
class Mailer{
    static sendMail(email, subject, text) {
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }}
        );
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text
        };
        transporter.sendMail(mailOptions,error=>{
            if (error){
                return console.log(error);
            }
        })
    }

}
module.exports = Mailer;


