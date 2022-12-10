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
exports.findProductById = exports.createProduct = exports.ProductService = void 0;
const _1 = require(".");
const utils_1 = require("../utils");
const entities_1 = require("../types/entities");
/**
 * Product Pagination Service
 */
class ProductService extends _1.AbstractPaginationService {
    getRepository() {
        return utils_1.AppDataSource.getRepository(entities_1.Product);
    }
}
exports.ProductService = ProductService;
const productRepository = utils_1.AppDataSource.getRepository(entities_1.Product);
const createProduct = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Product input', input);
        return (yield utils_1.AppDataSource.manager.save(utils_1.AppDataSource.manager.create(entities_1.Product, input)));
    }
    catch (error) {
        console.log('Error: (product.service -> createProduct)', error);
        if (error instanceof Error)
            throw new utils_1.AppError(400, error.message);
        else
            throw new utils_1.AppError(400, 'Something went Wrong');
    }
});
exports.createProduct = createProduct;
const findProductById = ({ id, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield productRepository.findOneBy({ id });
    }
    catch (error) {
        console.log('Error: (product.service -> findProductById)', error);
        if (error instanceof Error)
            throw new utils_1.AppError(400, error.message);
        else
            throw new utils_1.AppError(400, 'Something went Wrong');
    }
});
exports.findProductById = findProductById;
