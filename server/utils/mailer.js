const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config()

class Mailer{

    static async sendMail(email, subject, token) {
        try{
            const oAuth2Client =new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,"https://developers.google.com/oauthplayground");
            oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});
            const accessToken = await oAuth2Client.getAccessToken();
            const transporterData =  nodemailer.createTransport({
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
            });
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
        }catch (e) {
            console.log(e);
        }

    }
    static async sendResponse(email, text) {
        try{
            const oAuth2Client =new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,"https://developers.google.com/oauthplayground");
            oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});
            const accessToken = await oAuth2Client.getAccessToken();
            const transporterData =  nodemailer.createTransport({
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
            })
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
        }catch (e) {
            console.log(e);
        }

    }

}
module.exports = Mailer;


