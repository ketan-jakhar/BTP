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
exports.joinCarpool = exports.deleteCarpool = exports.updateCarpool = exports.createCarpool = exports.getCarpoolById = exports.getAllCarpools = void 0;
require('dotenv').config;
const services_1 = require("../services");
const enums_1 = require("../types/enums");
const utils_1 = require("../utils");
// Get all carpools
const getAllCarpools = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params } = req.body;
        const carpoolService = new services_1.CarpoolService();
        let carpools;
        if (params.searchType == enums_1.SearchType.COUNT)
            carpools = yield carpoolService.countResources(params);
        else
            carpools = yield carpoolService.listResources(params);
        res.status(200).json({
            status: 'success',
            data: { carpools },
            message: 'All Carpools data retrieved successfully',
        });
    }
    catch (err) {
        console.log('Error: (carpool.controller -> getCarPool)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getAllCarpools = getAllCarpools;
// Get carpool by id
const getCarpoolById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const carpool = yield (0, services_1.findCarpoolById)({ id });
        if (!carpool)
            return next(new utils_1.AppError(404, 'Carpool not found'));
        return res.status(200).json({
            status: 'success',
            data: carpool,
            message: 'Carpool loaded successfully',
        });
    }
    catch (err) {
        console.log('Error: (carpool.controller -> getCabInfo)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.getCarpoolById = getCarpoolById;
const createCarpool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { payload } = req.body;
        const carpoolService = new services_1.CarpoolService();
        const createdCarpool = yield carpoolService.createResource(payload);
        const carpool = (yield (0, services_1.findCarpoolById)({
            id: createdCarpool.identifiers[0].id,
        }));
        carpool.name = `${carpool.source} to ${carpool.destination}`;
        const setDepartureTime = new Date(payload.departure_time);
        carpool.departure_time = setDepartureTime;
        yield carpool.save();
        res.status(201).json({
            status: 'success',
            data: { createdCarpool, carpool },
            message: 'Carpool created successfully',
        });
    }
    catch (err) {
        console.log('Error: (carpool.controller -> createCarpool)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.createCarpool = createCarpool;
const updateCarpool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { payload } = req.body;
        const carpoolService = new services_1.CarpoolService();
        const updatedCarpool = yield carpoolService.updateResource(id, payload);
        res.status(200).json({
            status: 'success',
            data: { updatedCarpool },
            message: 'Carpool updated successfully',
        });
    }
    catch (err) {
        console.log('Error: (carpool.controller -> updateCarpool)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.updateCarpool = updateCarpool;
const deleteCarpool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const carpoolService = new services_1.CarpoolService();
        const deletedCarpool = yield carpoolService.deleteResource(id);
        res.status(200).json({
            status: 'success',
            data: { deletedCarpool },
            message: 'Carpool deleted successfully',
        });
    }
    catch (err) {
        console.log('Error: (carpool.controller -> deleteCarpool)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.deleteCarpool = deleteCarpool;
const joinCarpool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const uid = user.id;
        const id = req.params.id;
        const carpool = yield (0, services_1.findCarpoolById)({ id });
        if (!carpool)
            return next(new utils_1.AppError(404, 'Carpool not found'));
        if (!user)
            return next(new utils_1.AppError(404, 'User not found'));
        if (carpool.rider_count < carpool.capacity)
            carpool.rider_count++;
        else
            return next(new utils_1.AppError(400, 'Carpool maximum capacity reached'));
        const { payload } = req.body;
        const carpoolService = new services_1.CarpoolService();
        const createBooking = yield carpoolService.updateResource(id, payload);
        const bookingUser = (yield (0, services_1.findUserById)({ id: uid }));
        if (bookingUser.id !== uid)
            return next(new utils_1.AppError(404, 'Unauthorized request: Attempt to breach.'));
        carpool.user_id.push(bookingUser);
        yield carpool.save();
        res.status(201).json({
            status: 'success',
            data: { createBooking, bookingUser, carpool },
            message: 'Booking created successfully',
        });
    }
    catch (err) {
        console.log('Error: (carpool.controller -> createBooking)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.joinCarpool = joinCarpool;
