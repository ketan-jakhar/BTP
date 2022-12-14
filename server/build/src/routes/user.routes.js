"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.use(middlewares_1.deserializeUser, middlewares_1.requireUser);
// GET /api/user/profile (self profile)
router.get('/profile', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getProfile);
// PUT /api/user/profile/update (update self profile)
router.put('/profile/update', middlewares_1.deserializeUser, middlewares_1.requireUser, 
// validate(updateUserSchema),
controllers_1.updateProfile);
// GET /api/user/all (get all users)
router.get('/all', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.getAllUsers);
exports.default = router;
