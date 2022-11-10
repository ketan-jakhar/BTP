"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
// GET /carpool
router.get('/all', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getAllCarpools);
// GET /carpool/:id
router.get('/:id', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getCarpoolById);
// POST /carpool/create
router.post('/create', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.createCarpool);
// PUT /carpool/:id/update
router.put('/:id/update', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.updateCarpool);
//DELETE /carpool/:id/delete
router.delete('/:id/delete', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.deleteCarpool);
exports.default = router;
