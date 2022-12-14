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
// GET /api/carpool
router.get('/all', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getAllCarpools);
// GET /api/carpool/:id
router.get('/:id', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getCarpoolById);
// POST /api/carpool/create
router.post('/create', middlewares_1.deserializeUser, middlewares_1.requireUser, (0, utils_1.validate)(schemas_1.createCarpoolSchema), controllers_1.createCarpool);
// PUT /api/carpool/:id/update
router.put('/:id/update', middlewares_1.deserializeUser, middlewares_1.requireUser, (0, utils_1.validate)(schemas_1.updateCarpoolSchema), controllers_1.updateCarpool);
//DELETE /api/carpool/:id/delete
router.delete('/:id/delete', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.deleteCarpool);
// PUT /api/carpool/:id/book
router.put('/:id/book', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.joinCarpool);
// PUT /api/carpool/:id/leave
router.put('/:id/leave', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.leaveCarpool);
exports.default = router;
