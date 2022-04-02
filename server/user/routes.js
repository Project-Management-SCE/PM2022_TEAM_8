const router = require("express").Router()
const auth = require(".././middleware/authmw");
const authController = require("./controller")
const {body} = require('express-validator');


router.post("/register",
    body('email').isEmail()
        .withMessage('Please enter a valid email address'),
    body('password').isLength({min: 5, max: 32})
        .withMessage('Password must be between 5 and 32 characters'),
    authController.register
);

router.post("/login", authController.login);
router.get("/me",auth,authController.me);

module.exports = router