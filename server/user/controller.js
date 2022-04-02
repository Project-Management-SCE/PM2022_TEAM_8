const authService = require('./service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class AuthController{
    async register(req,res,next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', errors.array()))
            }
            const {email, password, firstName,lastName} = req.body;
            const token = await authService.register(email, password,firstName,lastName);
            res.json({accessToken:token});
        } catch (err) {
            next(err)
        }
    }

    async login(req,res,next){
        try {
            const {email, password} = req.body;
            const token = await authService.login(email,password)
            res.json({accessToken:token});
        } catch (err) {
            next(err)
        }
    }
    async me(req,res,next){
        try{
            const {email} = req.user
            const user = await authService.me(email)
            res.json({user})
        }catch (err) {
            next(err);
        }
    }
    async getUsers(req,res,next){
        try{
            const users = await authService.getUsers();
            res.json({users})
        }catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController()