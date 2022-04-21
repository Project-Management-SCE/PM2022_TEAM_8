const jwt = require("jsonwebtoken");
const ApiError = require('../exceptions/api-error');
const config = process.env;

const verifyToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded.user;

    } catch (err) {
        return next(ApiError.UnauthorizedError());
    }
    return next();
};


module.exports = verifyToken;