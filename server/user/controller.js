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
}

module.exports = new AuthController()