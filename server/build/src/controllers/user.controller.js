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
exports.getAllUsers = exports.updateProfile = exports.getProfile = void 0;
require('dotenv').config;
const services_1 = require("../services");
const enums_1 = require("../types/enums");
const utils_1 = require("../utils");
// Get user profile (self)
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.user;
        if (!id)
            return next(new utils_1.AppError(400, 'User not found'));
        const user = yield (0, services_1.findUserById)({ id });
        if (!user)
            return next(new utils_1.AppError(404, 'User not found'));
        res.status(200).json({
            status: 'success',
            data: user,
            message: 'User retrieved successfully',
        });
    }
    catch (err) {
        console.log('Error: (user.controller -> getProfile)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getProfile = getProfile;
// Update user profile
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('REQ BODY - \n', req.body);
        const { payload } = req.body;
        const { id } = res.locals.user;
        console.log('PAYLOAD - \n', payload);
        if (!id)
            return next(new utils_1.AppError(400, 'User not found'));
        const userService = new services_1.UserService();
        const updatedUser = yield userService.updateResource(id, payload);
        if (!updatedUser)
            return next(new utils_1.AppError(400, 'User not found'));
        const user = yield (0, services_1.findUserById)({ id });
        console.log('UPDATED USER - \n', updatedUser);
        res.status(200).json({
            status: 'success',
            data: { updatedUser, user },
            message: 'User updated successfully',
        });
    }
    catch (err) {
        console.log('Error: (user.controller -> updateProfile)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.updateProfile = updateProfile;
// Get all users
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params } = req.body;
        const userService = new services_1.UserService();
        let users;
        if (params.searchType == enums_1.SearchType.COUNT)
            users = yield userService.countResources(params);
        else
            users = yield userService.listResources(params);
        res.status(200).json({
            status: 'success',
            data: { users },
            message: 'All Users data retrieved successfully',
        });
    }
    catch (err) {
        console.log('Error: (user.controller -> getAllUsers)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getAllUsers = getAllUsers;
