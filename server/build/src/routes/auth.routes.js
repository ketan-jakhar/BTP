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
router.get('/register', controllers_1.getRegisterHandler);
// POST Register user
router.post('/register', (0, utils_1.validate)(schemas_1.createUserSchema), controllers_1.registerHandler);
// GET Login user
router.get('/login', controllers_1.getLoginHandler);
// POST Login user
router.post('/login', (0, utils_1.validate)(schemas_1.loginUserSchema), controllers_1.loginHandler);
// GET Logout user
router.get('/logout', middlewares_1.deserializeUser, middlewares_1.requireUser, controllers_1.logoutHandler);
// GET Refresh access token
router.get('/refresh', controllers_1.refreshAccessTokenHandler);
// TODO: Add validate(forgotPasswordSchema)
// GET Change password
router.get('/change-password', middlewares_1.verifyTokenUrl, controllers_1.getForgotPasswordHandler);
// POST Forgot password (Send Email for Verification)
router.post('/forgot-password', middlewares_1.deserializeUser, middlewares_1.requireUser, (0, utils_1.validate)(schemas_1.forgotPasswordSchema), controllers_1.forgotPasswordHandler);
exports.default = router;
