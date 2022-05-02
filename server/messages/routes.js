const router = require("express").Router()
const messageController = require("./controller")
const {body} = require('express-validator');
const auth = require("../middleware/authmw");
const verifyAdmin = require("../middleware/adminmw");


router.post('/send-message',
    body('email').isEmail()
        .withMessage('Please enter a valid email address'),
    body('text').isLength({min: 1})
        .withMessage('Please elaborate further on your request'),
    body('subject').isLength({min: 1})
        .withMessage('Enter your request subject'),
    messageController.sendMessage);
router.post('/send-reply',auth,verifyAdmin,messageController.sendReply);
router.get('/get-all',auth,verifyAdmin,messageController.getMessages);
router.put('/mark-closed',auth,verifyAdmin,messageController.markClosed);
module.exports = router