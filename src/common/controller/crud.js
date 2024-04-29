const { StatusCodes } = require("http-status-codes");
const { fmt_res } = require("../formetter");
const { BaseController } = require("./base");

class CRUDController extends BaseController {
    
    constructor(model) {
        super();
        this.model = model;
    }

    async find(res, query){
        try {
            const queriedRes = await this.model.find(query);
            return res.status(StatusCodes.OK).json(fmt_res(queriedRes));
        } catch (error) {
            this.errorHandler(res, error);
        }
    }

    async findById(res, id){
        try {
            const queriedRes = await this.model.findById(id);
            return res.status(StatusCodes.OK).json(fmt_res(queriedRes));
        } catch (error) {
            this.errorHandler(res, error);
        }
    }

    async paginatedFind(res, pagination, query){
        try {
            const {perPage = 20, pageNo  = 1} = pagination;
            const queriedRes = await this.model.find(query).skip((pageNo - 1)*perPage).limit(perPage);
            return res.status(StatusCodes.OK).json(fmt_res(queriedRes));
        } catch (error) {
            this.errorHandler(res, error)
        }
    }

    async findOne(res, query){
        try {
            const queriedRes = await this.model.findOne(query);
            return res.status(StatusCodes.OK).json(fmt_res(queriedRes));
        } catch (error) {
            this.errorHandler(res, error)
        }
    }

    async create(res, document){
        try {
            const createdDoc = await this.model.create(document);
            return res.status(StatusCodes.CREATED).json(fmt_res(createdDoc))
        } catch (error) {
            this.errorHandler(res, error)
        }
    }

    async update(res, id, document) {
        try {
            const updatedDocument = await this.model.findByIdAndUpdate(id, document);
            return res.status(StatusCodes.OK).json(fmt_res(updatedDocument))
        } catch (error) {
            this.errorHandler(res, error)
        }
    }

    async delete(res, id) {
        try {
            const updatedDocument = await this.model.findByIdAndUpdate(id, {deleted: true});
            return res.status(StatusCodes.OK).json(fmt_res(updatedDocument))
        } catch (error) {
            this.errorHandler(res, error)
        }
    }

}

module.exports = { CRUDController };