const router = require("express").Router()
const auth = require(".././middleware/authmw");
const userController = require("./controller")
const {body} = require('express-validator');
const verifyAdmin = require(".././middleware/adminmw");

router.post("/register",
    body('email').isEmail()
        .withMessage('Please enter a valid email address'),
    body('password').isLength({min: 5, max: 32})
        .withMessage('Password must be between 5 and 32 characters'),
    userController.register
);
router.get("/me",auth,userController.me);
router.post("/login", userController.login);
router.get("/users",auth,verifyAdmin,userController.getUsers);

module.exports = router