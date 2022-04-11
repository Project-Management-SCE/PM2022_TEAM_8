const jwt = require("jsonwebtoken");
const ApiError = require('../exceptions/api-error');
const config = process.env;

const verifyToken = (req, res, next) => {
    try {
        const token = req.body.token;
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }
        const decoded = jwt.verify(token, config.TOKEN_KEY);

        req.body.email = decoded.user.email
        if (decoded.user.type === 'recover') {
            return next();
        } else {
            return next(new ApiError(403, 'You are not authorized to perform this action'));
        }
    } catch (err) {
        return next(ApiError.UnauthorizedError());
    }
};


module.exports = verifyToken;