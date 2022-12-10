"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
// GET /recycle/all
router.get('/all', middlewares_1.requireUser, middlewares_1.deserializeUser, controllers_1.getAllRecycleHandler);
router.get('/:id', middlewares_1.requireUser, middlewares_1.deserializeUser, controllers_1.getOneRecycleHandler);
router.post('/create', middlewares_1.requireUser, middlewares_1.deserializeUser, (0, utils_1.validate)(schemas_1.createRecycleSchema), controllers_1.createRecycleHandler);
router.put('/:id/update', middlewares_1.requireUser, middlewares_1.deserializeUser, (0, utils_1.validate)(schemas_1.updateRecycleSchema), controllers_1.updateRecycleHandler);
router.delete('/:id/delete', middlewares_1.requireUser, middlewares_1.deserializeUser, controllers_1.deleteRecycleHandler);
exports.default = router;
