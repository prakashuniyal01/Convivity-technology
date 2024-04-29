const {Router} = require('express');
const  { taskRouter } = require('./task.routes');

const v1Router = Router();

v1Router.use("/task",  taskRouter );
module.exports = {v1Router};