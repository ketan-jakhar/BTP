"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.use(middlewares_1.deserializeUser, middlewares_1.requireUser);
router.get('/profile', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getProfile);
router.put('/profile/update', middlewares_1.deserializeUser, middlewares_1.requireUser, (0, utils_1.validate)(schemas_1.updateUserSchema), controllers_1.updateProfile);
router.get('/all', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getAllUsers);
exports.default = router;
