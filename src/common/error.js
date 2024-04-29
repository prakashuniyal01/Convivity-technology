const { StatusCodes } = require('http-status-codes');
const { LOGGER } = require('./logger');

function logErrors (err, req, res, next) {
    LOGGER.error(err.stack);
    next(err)
}

function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
        LOGGER.warning(req.xhr)
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: err,
            message: "Bad request."
        })
    }
    next(err)
}

function errorHandler (err, req, res, next) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
        data: err
    })
}
  
module.exports = { logErrors, clientErrorHandler, errorHandler }