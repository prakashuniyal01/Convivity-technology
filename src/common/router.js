const {Router} = require('express');
const {CRUDController} = require('./controller/index')


function crud_router(model){
    const router = Router();
    const controller = new CRUDController(model)

    router.get('/', async (req, res) => controller.find(res, req.body));

    router.get('/:id', async (req, res) => controller.findById(res, req.params.id));
    
    router.get('/', async (req, res) => controller.paginatedFind(res, req.query, {deleted: false}));

    
    router.post('/', async (req, res) => controller.create(res, req.body));
    
    router.put('/:id', async (req, res) => controller.update(res, req.params.id, req.body))
    
    router.delete('/:id', async (req, res) => controller.delete(res, req.params.id))
  
    return router;
}

module.exports = {crud_router}