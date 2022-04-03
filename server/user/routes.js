const router = require("express").Router()
const auth = require(".././middleware/authmw");
const userController = require("./controller")
const {body} = require('express-validator');
const verifyAdmin = require(".././middleware/adminmw");
const verifyRecover = require(".././middleware/recovermw");
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
router.delete("/delete/:email",auth,verifyAdmin,userController.deleteUser);
router.put("/update/",auth,userController.updateUser);
router.patch("/update-password",auth,userController.updatePassword);
router.post("/recover-password",verifyRecover,userController.recoverPassword);
router.post("/recover-token",userController.getRecoverToken);
module.exports = router