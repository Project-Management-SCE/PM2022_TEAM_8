const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) { // eslint-disable-line no-unused-vars
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: err.message})
};