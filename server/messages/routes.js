const router = require("express").Router()
const messageController = require("./controller")
const {body} = require('express-validator');


router.post('/send-message',
    body('email').isEmail()
        .withMessage('Please enter a valid email address'),
    body('text').isLength({min: 1})
        .withMessage('Please elaborate further on your request'),
    body('topic').isLength({min: 1})
        .withMessage('Enter your request topic'),
    messageController.sendMessage);
router.post('/send-reply',messageController.sendReply);

module.exports = router