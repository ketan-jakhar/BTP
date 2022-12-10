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
exports.findRecycleById = exports.createRecycle = exports.RecycleService = void 0;
const _1 = require(".");
const utils_1 = require("../utils");
const entities_1 = require("../types/entities");
/**
 * Recycle Pagination Service
 */
class RecycleService extends _1.AbstractPaginationService {
    getRepository() {
        return utils_1.AppDataSource.getRepository(entities_1.Recycle);
    }
}
exports.RecycleService = RecycleService;
const recycleRepository = utils_1.AppDataSource.getRepository(entities_1.Recycle);
const createRecycle = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Recycle input', input);
        return (yield utils_1.AppDataSource.manager.save(utils_1.AppDataSource.manager.create(entities_1.Recycle, input)));
    }
    catch (error) {
        console.log('Error: (recycle.service -> createRecycle)', error);
        if (error instanceof Error)
            throw new utils_1.AppError(400, error.message);
        else
            throw new utils_1.AppError(400, 'Something went Wrong');
    }
});
exports.createRecycle = createRecycle;
const findRecycleById = ({ id, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield recycleRepository.findOneBy({ id });
    }
    catch (error) {
        console.log('Error: (recycle.service -> findRecycleById)', error);
        if (error instanceof Error)
            throw new utils_1.AppError(400, error.message);
        else
            throw new utils_1.AppError(400, 'Something went Wrong');
    }
});
exports.findRecycleById = findRecycleById;
