const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

class Mailer{
    static async sendMail(email, subject, token) {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );
        const accessToken = oauth2Client.getAccessToken()
        const transporterData = process.env.PRODUCTIOON ?  nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            },
            tls: {
                rejectUnauthorized: false
            }
        }):{
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }};
        const transporter = nodemailer.createTransport(transporterData);
        const filePath = path.join(__dirname, './mail-template/index.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            link: process.env.PRODUCTIOON ?`https://w2w-front.herokuapp.com//reset-password/${token}`:`http://localhost:3000/reset-password/${token}`
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: htmlToSend,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.join(__dirname, './mail-template/images/logo.png'),
                    cid: 'logo'
                },
                {
                    filename: 'reset.png',
                    path: path.join(__dirname, './mail-template/images/reset.png'),
                    cid: 'reset'
                }
            ]
        };
        await transporter.sendMail(mailOptions,error=>{
            if (error){
                return console.log(error);
            }
        })
    }
    static async sendResponse(email, text) {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );
        const accessToken = oauth2Client.getAccessToken()
        const transporterData = process.env.PRODUCTIOON ?  nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            },
            tls: {
                rejectUnauthorized: false
            }
        }):{
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }};
        const transporter = nodemailer.createTransport(transporterData);
        const filePath = path.join(__dirname, './mail-template/reply.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            body: text
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Response from W2W staff',
            html: htmlToSend,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.join(__dirname, './mail-template/images/logo.png'),
                    cid: 'logo'
                }
            ]
        };
        await transporter.sendMail(mailOptions,error=>{
            if (error){
                return console.log(error);
            }
        })
    }

}
module.exports = Mailer;


