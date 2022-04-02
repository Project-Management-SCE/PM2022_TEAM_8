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

    async login(email, password) {
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password.toString(), user.password))) {
            throw ApiError.BadRequest("Invalid ID or password")
        }
        return this.signToken(user);
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

    async me(userId) {
        const user = await User.findOne({cid:userId});
        if (!user) {
            throw ApiError.BadRequest("User does not exist")
        }
        return new UserDto(user.email, user.firstName,user.lastName,user.type)

    }
    async getUsers() {
        const users = await User.find({});
        return users.map(user => new UserDto(user.email, user.firstName,user.lastName,user.type))
    }

}

module.exports = new AuthService();