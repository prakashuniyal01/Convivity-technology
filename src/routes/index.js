const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');
const {v1Router} = require('./v1');

const appRouter = Router();

appRouter.get('/health', (req, res) => res.status(StatusCodes.OK).json('working'));
appRouter.use('/v1', v1Router);

module.exports = {appRouter}



