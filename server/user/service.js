const User = require('./model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ApiError = require('../exceptions/api-error')
const UserDto = require('./dto')
const mailer = require('../utils/mailer')

class AuthService {
    async registerBody(email, password) {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            throw ApiError.BadRequest("User Already Exist. Please Login")
        }
        const encryptedPassword = await bcrypt.hash(password.toString(), 7);
        return encryptedPassword
    }
    signToken(user,type) {
        const payload = { user: { id:user._id, email: user.email, type } }
        return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "365d", });
    }
    signRecoverToken(user) {
        const payload = { user: { email: user.email, type: "recover" } }
        return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "5m", });
    }
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password.toString(), user.password))) {
            throw ApiError.BadRequest("Invalid Email or password")
        }
        return this.signToken(user,"User");
    }
    async loginAdmin(email, password) {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password.toString(), user.password))) {
            throw ApiError.BadRequest("Invalid Email or password")
        }
        if(user.type !== "Admin"){
            throw ApiError.UnauthorizedError("You don't have admin privileges!, Use regular users login page!")
        }
        return this.signToken(user,"Admin");
    }

    async register(email, password, lastName, firstName,address,phone) {
        const encryptedPassword = await this.registerBody(email, password);
        const newUser = await new User(
            {
                lastName,
                firstName,
                email,
                password: encryptedPassword,
                address,
                phone,
                type: "User"
            })
        await newUser.save()
        return this.signToken(newUser,"User");
    }
    async registerAdmin(email, password) {
        const encryptedPassword = await this.registerBody(email, password);
        const newUser = await new User(
            {
                email,
                password: encryptedPassword,
                type: "Admin"
            })
        await newUser.save()
    }

    async me(email,type) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User does not exist")
        }
        const now = new Date();
        if(user.isBlocked && (user.blockedUntil && user.blockedUntil.getTime() > now.getTime())){
            throw ApiError.BadRequest("User is blocked from the site!")
        }else if(user.isBlocked ||(user.blockedUntil && user.blockedUntil.getTime() > now.getTime())){
            user.isBlocked = false;
            user.blockedUntil = null;
            await user.save();
        }
        return new UserDto(user._id,user.email, user.isBlocked, user.firstName, user.lastName, type, user.address, user.phone)

    }
    async getUsers() {
        const users = await User.find({type:"User"})
        return users.map(user => new UserDto(user._id,user.email,user.isBlocked, user.firstName, user.lastName, user.type, user.address, user.phone))
    }
    async deleteUser(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User does not exist")
        }
        await User.deleteOne({ email })
        return "User Deleted"
    }
    async blockUser(email, date) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User does not exist")
        }
        user.isBlocked = true;
        user.blockedUntil = date;
        await user.save();
        return "User successfully blocked"
    }
    async unblockUser(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User does not exist")
        }
        user.isBlocked = false;
        user.blockedUntil = null;
        await user.save();
        return "User successfully unblocked"
    }
    async updateUser(email, firstName, lastName,address,phone) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User does not exist")
        }
        await User.updateOne({ email }, { firstName, lastName ,address, phone})
        return "User Updated"
    }
    async updatePassword(email, password) {
        const encryptedPassword = await bcrypt.hash(password.toString(), 7);
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User does not exist")
        }
        await User.updateOne({ email }, { password: encryptedPassword })
        return "Password Updated"
    }
    async getRecoverToken(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("Email does not exist")
        }
        const token = this.signRecoverToken(user)
        await mailer.sendMail(email, "Password recovery W2W", token)
        return "Mail with instructions sent"
    }

    async checkBlocked(email){
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User does not exist")
        }
    }
}

module.exports = new AuthService();