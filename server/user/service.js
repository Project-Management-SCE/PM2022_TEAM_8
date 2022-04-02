const User = require('./model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ApiError = require('../exceptions/api-error')
const UserDto = require('./dto')

class AuthService {
    async registerBody(email,password){
        const oldUser = await User.findOne({email});
        if (oldUser) {
            throw ApiError.BadRequest("User Already Exist. Please Login")
        }
        const encryptedPassword = await bcrypt.hash(password.toString(), 7);
        return encryptedPassword
    }
    signToken(user) {
        const payload = {user: {email: user.email, type: user.type}}
        return jwt.sign(payload, process.env.TOKEN_KEY, {expiresIn: "48h",});
    }



    async register(email,password,lastName, firstName) {
        const encryptedPassword = await this.registerBody(email,password);
        const newUser = await new User(
            {
                lastName,
                firstName,
                email,
                password: encryptedPassword,
                userType: "User"
            })
        await newUser.save()
        return this.signToken(newUser)
    }


}

module.exports = new AuthService();