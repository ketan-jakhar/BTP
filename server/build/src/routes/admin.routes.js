"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.use(middlewares_1.deserializeUser, middlewares_1.requireUser);
router.get('/all', middlewares_1.deserializeUser, middlewares_1.requireUser, middlewares_1.requireAdmin, controllers_1.getAllUsers);
exports.default = router;
