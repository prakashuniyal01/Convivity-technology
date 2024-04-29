const {crud_router} = require('../common/router');
const { Task } = require('../models/task.model')


const taskRouter = crud_router( Task );
module.exports = { taskRouter }