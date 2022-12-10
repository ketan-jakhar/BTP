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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenUrl = exports.requireUser = exports.deserializeUser = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new utils_1.AppError(401, 'You are not logged in'));
        }
        // Validate the access token
        const decoded = (0, utils_1.verifyJwt)(access_token, 'accessTokenPublicKey');
        if (!decoded) {
            return next(new utils_1.AppError(401, `Invalid token or user doesn't exist`));
        }
        // Check if the user still exist
        const { id } = decoded;
        const user = yield (0, services_1.findUserById)({ id });
        if (!user) {
            return next(new utils_1.AppError(401, `Invalid token or session has expired`));
        }
        // Add user to res.locals
        res.locals.user = user;
        next();
    }
    catch (err) {
        console.log('Error: (auth.controller -> deserializeUser)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.deserializeUser = deserializeUser;
const requireUser = (req, res, next) => {
    try {
        const { user } = res.locals;
        if (!user) {
            return next(new utils_1.AppError(400, `Session has expired or user doesn't exist`));
        }
        res.locals.user = user;
        next();
    }
    catch (err) {
        console.log('Error: (auth.controller -> requireUser)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
};
exports.requireUser = requireUser;
const verifyTokenUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate URL queries
        const queryObjectLength = Object.keys(req.query).length;
        console.log('queryObjectLength: ', queryObjectLength);
        const token = req.query.tk;
        const isValidToken = (0, utils_1.verifyToken)(token).success;
        console.log(!(queryObjectLength === 1 && req.query.tk && isValidToken) ||
            req.query.tk === undefined);
        if (!(queryObjectLength === 1 && req.query.tk && isValidToken) ||
            req.query.tk === undefined) {
            next(new utils_1.AppError(400, 'Invalid URL'));
        }
        // Validate the token
        if (isValidToken) {
            const id = (0, utils_1.verifyToken)(token).id;
            const user = yield (0, services_1.findUserById)({ id });
            if (!user) {
                next(new utils_1.AppError(401, 'User not found'));
            }
            else {
                console.log('user.changePasswordToken: (auth.middleware -> verifyTokenUrl)', user.change_password_token);
                console.log('token: (VerifyTokenUrl -> verifyTokenUrl)', token);
                if (user.change_password_token !== token) {
                    next(new utils_1.AppError(401, 'Token Invalid or expired'));
                }
                res.locals.user = user;
                next();
            }
        }
        else {
            next(new utils_1.AppError(401, 'Invalid Token'));
        }
    }
    catch (err) {
        console.log('Error: (auth.middleware -> verifyTokenUrl)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.verifyTokenUrl = verifyTokenUrl;
