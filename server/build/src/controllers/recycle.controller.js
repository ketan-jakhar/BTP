"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecycleHandler = exports.updateRecycleHandler = exports.createRecycleHandler = exports.getOneRecycleHandler = exports.getAllRecycleHandler = void 0;
require('dotenv').config;
const services_1 = require("../services");
const enums_1 = require("../types/enums");
const utils_1 = require("../utils");
// recent recycles from here only
const getAllRecycleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params } = req.body;
        const recycleService = new services_1.RecycleService();
        let recycles;
        if (params.searchType == enums_1.SearchType.COUNT)
            recycles = yield recycleService.countResources(params);
        else
            recycles = yield recycleService.listResources(params);
        res.status(200).json({
            status: 'success',
            data: { recycles },
            message: 'All Recycles data retrieved successfully',
        });
    }
    catch (err) {
        console.log('Error: (recycle.controller -> getAllRecycles)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getAllRecycleHandler = getAllRecycleHandler;
// get one recycle by id
const getOneRecycleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const recycle = yield (0, services_1.findRecycleById)({ id });
        if (!recycle)
            return next(new utils_1.AppError(404, 'Recycle not found'));
        return res.status(200).json({
            status: 'success',
            data: recycle,
            message: 'Recycle loaded successfully',
        });
    }
    catch (err) {
        console.log('Error: (recycle.controller -> getRecycleById)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getOneRecycleHandler = getOneRecycleHandler;
// create a new recycle
const createRecycleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = res.locals.user.id;
        const { payload } = req.body;
        const recycleService = new services_1.RecycleService();
        const createdRecycle = yield recycleService.createResource(Object.assign(Object.assign({}, payload), { user_id }));
        res.status(201).json({
            status: 'success',
            data: createdRecycle,
            message: 'Recycle created successfully',
        });
    }
    catch (err) {
        console.log('Error: (recycle.controller -> createRecycle)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.createRecycleHandler = createRecycleHandler;
// update a recycle
const updateRecycleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { payload } = req.body;
        const recycleService = new services_1.RecycleService();
        const updatedRecycle = yield recycleService.updateResource(id, payload);
        res.status(200).json({
            status: 'success',
            data: { updatedRecycle },
            message: 'Recycle updated successfully',
        });
    }
    catch (err) {
        console.log('Error: (recycle.controller -> updateRecycle)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.updateRecycleHandler = updateRecycleHandler;
// delete a recycle
const deleteRecycleHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const recycleService = new services_1.RecycleService();
        const deletedRecycle = yield recycleService.deleteResource(id);
        res.status(200).json({
            status: 'success',
            data: { deletedRecycle },
            message: 'Recycle deleted successfully',
        });
    }
    catch (err) {
        console.log('Error: (recycle.controller -> deleteRecycle)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.deleteRecycleHandler = deleteRecycleHandler;
