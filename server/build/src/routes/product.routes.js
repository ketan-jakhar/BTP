"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
router.use(middlewares_1.deserializeUser, middlewares_1.requireUser);
// GET /shop
router.get('/all', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getAllProducts);
// GET /shop/:id
router.get('/:id', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getProductById);
// POST /shop/create
router.post('/create', middlewares_1.deserializeUser, middlewares_1.requireUser, (0, utils_1.validate)(schemas_1.createProductSchema), controllers_1.createProduct);
// PUT /shop/:id/update
router.put('/:id/update', middlewares_1.deserializeUser, middlewares_1.requireUser, 
// validate(updateProductSchema),
controllers_1.updateProduct);
//DELETE /shop/:id/delete
router.delete('/:id/delete', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.deleteProduct);
// GET /shop/cart
router.get(':id/cart', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getCart);
// POST /shop/:id/add-to-cart
router.post('/:id/add-to-cart', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.addToCart);
// DELETE /shop/:id/remove-from-cart
router.delete('/:id/remove-from-cart', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.removeFromCart);
// POST /shop/buy
router.get(':id/buy', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.buyProduct);
exports.default = router;
