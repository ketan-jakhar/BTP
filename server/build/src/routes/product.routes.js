"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
// GET /shop
router.get('/all', controllers_1.getAllProducts);
// GET /shop/:id
router.get('/:id', controllers_1.getProductById);
// POST /shop/create
router.post('/create', controllers_1.createProduct);
// PUT /shop/:id/update
router.put('/:id/update', controllers_1.updateProduct);
//DELETE /shop/:id/delete
router.delete('/:id/delete', controllers_1.deleteProduct);
exports.default = router;
