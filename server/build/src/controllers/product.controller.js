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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
require('dotenv').config;
const services_1 = require("../services");
const enums_1 = require("../types/enums");
const utils_1 = require("../utils");
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params } = req.body;
        const productService = new services_1.ProductService();
        let products;
        if (params.searchType == enums_1.SearchType.COUNT)
            products = yield productService.countResources(params);
        else
            products = yield productService.listResources(params);
        res.status(200).json({
            status: 'success',
            data: { products },
            message: 'All Products data retrieved successfully',
        });
    }
    catch (err) {
        console.log('Error: (product.controller -> getAllProducts)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, services_1.findProductById)({ id });
        if (!product)
            return next(new utils_1.AppError(404, 'Product not found'));
        return res.status(200).json({
            status: 'success',
            data: product,
            message: 'Product loaded successfully',
        });
    }
    catch (err) {
        console.log('Error: (product.controller -> getProductById)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { payload } = req.body;
        const productService = new services_1.ProductService();
        const createdProduct = yield productService.createResource(payload);
        res.status(201).json({
            status: 'success',
            data: createdProduct,
            message: 'Product created successfully',
        });
    }
    catch (err) {
        console.log('Error: (product.controller -> createProduct)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { payload } = req.body;
        const productService = new services_1.ProductService();
        const updatedProduct = yield productService.updateResource(id, payload);
        res.status(200).json({
            status: 'success',
            data: { updateProduct: exports.updateProduct },
            message: 'Product updated successfully',
        });
    }
    catch (err) {
        console.log('Error: (product.controller -> updateProduct)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productService = new services_1.ProductService();
        const deletedProduct = yield productService.deleteResource(id);
        res.status(200).json({
            status: 'success',
            data: { deletedProduct },
            message: 'Product deleted successfully',
        });
    }
    catch (err) {
        console.log('Error: (product.controller -> deleteProduct)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.deleteProduct = deleteProduct;
