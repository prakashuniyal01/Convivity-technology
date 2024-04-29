const { StatusCodes } = require('http-status-codes');
const { fmt_res } = require("../formetter");
const { LOGGER } = require('../logger');

class BaseController {
    
    constructor() {
        this.DEFAULT_ERROR_MSG = 'Something went wrong';
        this.OK = "ok"
    }

    errorHandler(res, error, statusCode = StatusCodes.BAD_REQUEST){
        LOGGER.error('[ERROR]', error);
        const _resp = fmt_res(error, this.DEFAULT_ERROR_MSG, false)
        return res.status(statusCode).json(_resp);
    }

    jsonRes = (res, body, message = this.OK, code = StatusCodes.OK) => {
        const _resp = fmt_res(body, message, true)
        return res.status(code).json(_resp)
    }

    errRes = (res, error, message = this.DEFAULT_ERROR_MSG, code = StatusCodes.BAD_REQUEST) => {
        const _resp = fmt_res(error, message, false)
        return res.status(code).json(_resp)
    }

}

module.exports = {BaseController};