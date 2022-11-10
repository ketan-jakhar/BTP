"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const middlewares_1 = require("../middlewares");
// GET /misc
router.get('/misc', middlewares_1.requireUser, middlewares_1.deserializeUser);
exports.default = router;
