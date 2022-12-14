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
// GET Register user
// GET /api/auth/register
router.get('/register', controllers_1.getRegisterHandler);
// POST Register user
// POST /api/auth/register
router.post('/register', (0, utils_1.validate)(schemas_1.createUserSchema), controllers_1.registerHandler);
// GET Login user
// GET /api/auth/login
router.get('/login', controllers_1.getLoginHandler);
// POST Login user
// POST /api/auth/login
router.post('/login', (0, utils_1.validate)(schemas_1.loginUserSchema), controllers_1.loginHandler);
// GET Logout user
// GET /api/auth/logout
router.get('/logout', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.logoutHandler);
// GET Refresh access token
// GET /api/auth/refresh
router.get('/refresh', controllers_1.refreshAccessTokenHandler);
// TODO: Add validate(forgotPasswordSchema)
// GET Change password
// GET /api/auth/change-password
router.get('/change-password', middlewares_1.verifyTokenUrl, controllers_1.getForgotPasswordHandler);
// POST Forgot password (Send Email for Verification)
// POST /api/auth/forgot-password
router.post('/forgot-password', (0, utils_1.validate)(schemas_1.forgotPasswordSchema), controllers_1.forgotPasswordHandler);
exports.default = router;
