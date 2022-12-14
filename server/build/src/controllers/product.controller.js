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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyProduct = exports.removeFromCart = exports.addToCart = exports.getCart = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
require('dotenv').config;
const moment_1 = __importDefault(require("moment"));
const services_1 = require("../services");
const enums_1 = require("../types/enums");
const utils_1 = require("../utils");
// recent orders from here only
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
        const user_id = res.locals.user.id;
        const { payload } = req.body;
        const productService = new services_1.ProductService();
        const createdProduct = yield productService.createResource(Object.assign(Object.assign({}, payload), { user_id }));
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
        const user_id = res.locals.user.id;
        const product = yield (0, services_1.findProductById)({ id });
        if (!product)
            return next(new utils_1.AppError(404, 'Product not found'));
        if (product.user_id !== user_id)
            return next(new utils_1.AppError(401, 'Unauthorized'));
        const { payload } = req.body;
        const productService = new services_1.ProductService();
        const updatedProduct = yield productService.updateResource(id, payload);
        res.status(200).json({
            status: 'success',
            data: { updatedProduct },
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
        const user_id = res.locals.user.id;
        const product = yield (0, services_1.findProductById)({ id });
        if (!product)
            return next(new utils_1.AppError(404, 'Product not found'));
        if (product.user_id !== user_id)
            return next(new utils_1.AppError(401, 'Unauthorized'));
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
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        if (!user)
            return next(new utils_1.AppError(401, 'Unauthorized'));
        const { params } = req.body;
        const productService = new services_1.ProductService();
        const cart = yield productService.listResources(params);
        const totalPrice = (0, utils_1.calculateCartTotal)(cart);
        res.status(200).json({
            status: 'success',
            data: {
                cart,
                totalPrice,
            },
            message: 'Cart loaded successfully',
        });
    }
    catch (err) {
        console.log('Error: (product.controller -> getCart)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getCart = getCart;
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        if (!user)
            return next(new utils_1.AppError(401, 'Unauthorized'));
        const { id } = req.body;
        const { payload } = req.body;
        if (!payload)
            return next(new utils_1.AppError(400, 'Invalid payload'));
        const product = yield (0, services_1.findProductById)({ id });
        if (!product)
            return next(new utils_1.AppError(404, 'Product not found'));
        if (!product.is_available)
            return next(new utils_1.AppError(400, 'Product not available for sell'));
        const productService = new services_1.ProductService();
        const cart = yield productService.createResource(payload);
        res.status(200).json({
            status: 'success',
            data: { cart },
            message: 'Product added to cart successfully',
        });
    }
    catch (err) {
        console.log('Error: (product.controller -> addToCart)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        if (!user)
            return next(new utils_1.AppError(401, 'Unauthorized'));
        const { payload } = req.body;
        const productService = new services_1.ProductService();
        const cart = yield productService.deleteResource(payload);
        res.status(200).json({
            status: 'success',
            data: { cart },
            message: 'Product removed from cart successfully',
        });
    }
    catch (err) {
        console.log('Error: (product.controller -> removeFromCart)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.removeFromCart = removeFromCart;
const buyProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        if (!user)
            return next(new utils_1.AppError(401, 'Unauthorized'));
        const { params } = req.body;
        const productService = new services_1.ProductService();
        const cart = yield productService.listResources(params);
        const updateResourcePayload = {
            is_available: false,
            sell_time: (0, moment_1.default)().format('DD-MM-YYYY h:mm:ss a'),
        };
        const updateResourceErrorPayload = {
            is_available: true,
            sell_time: '',
        };
        cart.forEach((product, index) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = product;
                yield productService.updateResource(id, updateResourcePayload);
                // generateInvoice(product);
            }
            catch (error) {
                if (index <= cart.length - 1 && index >= 0) {
                    const count = index;
                    cart.forEach((product, index) => __awaiter(void 0, void 0, void 0, function* () {
                        if (index <= count && index >= 0) {
                            const { id } = product;
                            yield productService.updateResource(id, updateResourceErrorPayload);
                        }
                    }));
                }
                console.log('Error: (product.controller -> buyProduct)', error);
                if (error instanceof Error)
                    return next(new utils_1.AppError(res.statusCode, error.message));
            }
        }));
        res.status(200).json({
            status: 'success',
            data: { cart },
            message: 'Product bought successfully',
        });
    }
    catch (err) {
        console.log('Error: (product.controller -> buyProduct)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.buyProduct = buyProduct;
