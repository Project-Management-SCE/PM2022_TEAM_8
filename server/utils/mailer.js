const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config()

class Mailer{
    static async getAccessToken(){
            const oauth2Client = new OAuth2(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                "https://developers.google.com/oauthplayground"
            );

            oauth2Client.setCredentials({
                refresh_token: process.env.REFRESH_TOKEN
            });

            const accessToken = await new Promise((resolve, reject) => {
                oauth2Client.getAccessToken((err, token) => {
                    if (err) {
                        reject();
                        console.log("Error while trying to retrieve access token");
                    }
                    resolve(token);
                });
            });

            return accessToken;
    }
    static async sendMail(email, subject, token) {
            const accessToken = await Mailer.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.EMAIL,
                    accessToken:accessToken,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN
                }
            });
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
            await transporter.sendMail(mailOptions)

    }
    static async sendResponse(email, text) {
            const accessToken = await Mailer.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.EMAIL,
                    accessToken:accessToken,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN
                }
            });
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
            await transporter.sendMail(mailOptions)
    }

}
module.exports = Mailer;


