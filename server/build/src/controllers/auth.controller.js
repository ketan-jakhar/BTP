"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordHandler = exports.getForgotPasswordHandler = exports.refreshAccessTokenHandler = exports.logout = exports.login = exports.getLogin = exports.register = exports.getRegister = void 0;
require('dotenv').config;
const config_1 = __importDefault(require("config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const services_1 = require("../services");
const utils_1 = require("../utils");
const entities_1 = require("../types/entities");
// GET /REGISTER
const getRegister = (req, res, next) => {
    try {
        return res.status(200).json({
            status: 'success',
            data: null,
            message: 'Page loaded successfully',
        });
    }
    catch (err) {
        console.log('Error: (auth.controller -> getRegister)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
};
exports.getRegister = getRegister;
// POST /REGISTER
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, contactNumber, } = req.body;
        let { email } = req.body;
        // 1. Check if the user already exist
        const checkUser = yield (0, services_1.findUserByEmail)({ email });
        if (checkUser)
            next(new utils_1.AppError(400, 'User with that email already exist'));
        // 2. Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10); // generate salt
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // 3. Create the new user
        const user = yield (0, services_1.createUser)({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            contactNumber,
        });
        // 4. Send the response
        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (err) {
        console.log('Error: (auth.controller -> register)', err);
        if (err.code === '23505') {
            return res.status(400).json({
                status: 'fail',
                message: 'User with that email already exist',
            });
        }
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.register = register;
// GET /LOGIN
const getLogin = (req, res, next) => {
    try {
        return res.status(200).json({
            status: 'success',
            data: null,
            message: 'Page loaded successfully',
        });
    }
    catch (err) {
        console.log('Error: (auth.controller -> getLogin)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
};
exports.getLogin = getLogin;
// POST /LOGIN
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        let { email } = req.body;
        const user = yield (0, services_1.findUserByEmail)({ email: email.toLowerCase() });
        console.log('Auth User:(auth.controller -> login) ', user);
        // 1. Check if user exists and password is valid
        if (!user || !(yield entities_1.User.comparePasswords(password, user.password))) {
            return next(new utils_1.AppError(400, 'Invalid email or password'));
        }
        // 2. Sign Access and Refresh Tokens
        const { access_token, refresh_token } = yield (0, utils_1.signTokens)(user);
        console.log('Access Token:(auth.controller -> login) ', access_token);
        console.log('Refresh Token:(auth.controller -> login) ', refresh_token);
        // 3. Add Cookies
        res.cookie('access_token', access_token, utils_1.accessTokenCookieOptions);
        res.cookie('refresh_token', refresh_token, utils_1.refreshTokenCookieOptions);
        res.cookie('logged_in', true, Object.assign(Object.assign({}, utils_1.accessTokenCookieOptions), { httpOnly: false }));
        console.log('Res.cookie: (auth.controller -> login)', res.cookie);
        // 4. Send response
        res.status(200).json({
            status: 'success',
            access_token,
        });
    }
    catch (err) {
        console.log('Error: (auth.controller -> login)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.login = login;
// GET /LOGOUT
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        // 1. Clear Cookies
        (0, utils_1.clearCookies)(res);
        // 2. Discard JWT
        // discardJwt();
        // 3. Send response
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    }
    catch (err) {
        console.log('Error: (auth.controller -> logout)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.logout = logout;
// Refresh the access Token
const refreshAccessTokenHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refresh_token } = req.cookies;
        const message = 'Could not refresh access token';
        // 1. Check if refresh token exists
        if (!refresh_token) {
            return next(new utils_1.AppError(403, message));
        }
        // 2. Validate refresh token
        const decoded = (0, utils_1.verifyJwt)(refresh_token, 'refreshTokenPublicKey');
        console.log('Decoded:(auth.controller -> refreshtoken) ', decoded);
        if (!decoded) {
            return next(new utils_1.AppError(403, message));
        }
        // TODO: change it
        const { email } = req.body;
        // 3. Check if the user still exists
        const user = (yield (0, services_1.findUserByEmail)({ email }));
        const { id, role } = user;
        const payload = { id, role };
        // 4. Sign new access token
        const access_token = (0, utils_1.signJwt)(payload, 'accessTokenPrivateKey', {
            expiresIn: `${config_1.default.get('accessTokenExpiresIn')}m`,
        });
        // 5. Add Cookies
        res.cookie('access_token', access_token, utils_1.accessTokenCookieOptions);
        res.cookie('logged_in', true, Object.assign(Object.assign({}, utils_1.accessTokenCookieOptions), { httpOnly: false }));
        console.log('Res.cookie: (auth.controller -> refreshtoken)', res.cookie);
        // 6. Send response
        res.status(200).json({
            status: 'success',
            access_token,
        });
    }
    catch (err) {
        console.log('Error: (auth.controller -> refreshTokenHandler)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
const getForgotPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({
            status: 'success',
            message: 'Page loaded successfully',
        });
    }
    catch (err) {
        console.log('Error: (auth.controller -> getForgotPassword)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getForgotPasswordHandler = getForgotPasswordHandler;
const forgotPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        console.log('User(res.locals.user):(auth.controller -> forgotPassword) ', user);
        const { token } = (0, utils_1.generateToken)(user.id);
        if (!token) {
            return next(new utils_1.AppError(500, 'Token not generated'));
        }
        user.changePasswordToken = token;
        yield user.save();
        const url = `${req.protocol}://${req.hostname}:${config_1.default.get('port')}/api/auth/change-password/?tk=${token}`;
        console.log('url: (userController -> createUserHandler)', url);
        // Email Payload
        const emailTo = '19ucc020@lnmiit.ac.in';
        const message = `Hello ${!!user.name ? user.name : 'User'},\nPlease click on the link below to change your password.\n${url}\nRegards,\nTeam GoodFind`;
        const subject = `Reset Password - GoodFind`;
        const emailFrom = 'ketanjakhar29@gmail.com';
        // Send Email
        (0, services_1.sendEmail)(emailTo, emailFrom, subject, message);
        return res.status(200).json({
            status: 'success',
            message: 'Email sent successfully',
        });
    }
    catch (err) {
        console.log('Error: (auth.controller -> forgotPassword)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.forgotPasswordHandler = forgotPasswordHandler;
