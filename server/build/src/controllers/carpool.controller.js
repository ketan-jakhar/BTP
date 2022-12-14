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
exports.leaveCarpool = exports.joinCarpool = exports.deleteCarpool = exports.updateCarpool = exports.createCarpool = exports.getCarpoolById = exports.getAllCarpools = void 0;
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
// Create carpool
const createCarpool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = res.locals.user;
        if (!id)
            return next(new utils_1.AppError(401, 'Unauthorized'));
        const { payload } = req.body;
        const carpoolService = new services_1.CarpoolService();
        const createdCarpool = yield carpoolService.createResource(Object.assign(Object.assign({}, payload), { publisher_rider_count: payload.rider_count, publisher_id: id }));
        const carpool = (yield (0, services_1.findCarpoolById)({
            id: createdCarpool.identifiers[0].id,
        }));
        carpool.name = `${carpool.source} to ${carpool.destination}`;
        const setDepartureTime = new Date(payload.departure_time);
        carpool.departure_time = setDepartureTime;
        // carpool.publisher_rider_count = carpool.rider_count;
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
// Update carpool
const updateCarpool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user_id = res.locals.user.id;
        const carpool = yield (0, services_1.findCarpoolById)({ id });
        if (!carpool)
            return next(new utils_1.AppError(404, 'carpool not found'));
        if (carpool.publisher_id !== user_id)
            return next(new utils_1.AppError(401, 'Unauthorized'));
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
// Delete carpool
const deleteCarpool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user_id = res.locals.user.id;
        const carpool = yield (0, services_1.findCarpoolById)({ id });
        if (!carpool)
            return next(new utils_1.AppError(404, 'carpool not found'));
        if (carpool.publisher_id !== user_id)
            return next(new utils_1.AppError(401, 'Unauthorized'));
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
// Join carpool
const joinCarpool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const uid = user.id;
        const { id } = req.params;
        if (!user)
            return next(new utils_1.AppError(404, 'User not found'));
        const carpool = yield (0, services_1.findCarpoolById)({ id });
        if (!carpool)
            return next(new utils_1.AppError(404, 'Carpool not found'));
        // if (carpool.rider_count < carpool.capacity) carpool.rider_count++;
        // else return next(new AppError(400, 'Carpool maximum capacity reached'));
        // const { payload }: { payload: QueryDeepPartialEntity<Carpool> } = req.body;
        // const carpoolService = new CarpoolService();
        // const createBooking = await carpoolService.updateResource(id, payload);
        const bookingUser = yield (0, services_1.findUserById)({ id: uid });
        if (!bookingUser)
            return next(new utils_1.AppError(404, 'User not found'));
        if (bookingUser.id !== uid)
            return next(new utils_1.AppError(404, 'Unauthorized request: Attempt to breach.'));
        if (bookingUser.id === carpool.publisher_id)
            return next(new utils_1.AppError(403, 'Forbidden. You cannot book your own carpool.'));
        console.log(carpool.user_id);
        const riderExists = (str) => {
            let arr = str.split('lnmiit');
            for (let e in arr) {
                if (e === bookingUser.id)
                    return true;
            }
            return false;
        };
        if (carpool.user_id === null || carpool.user_id === undefined) {
            if (carpool.rider_count < carpool.capacity)
                carpool.rider_count++;
            else
                return next(new utils_1.AppError(400, 'Carpool maximum capacity reached'));
            // carpool.user_id = [bookingUser];
            if (carpool.mapping.includes(`${bookingUser.id}lnmiit`)) {
                return next(new utils_1.AppError(400, 'You have already booked this carpool'));
            }
            else
                carpool.mapping += `${bookingUser.id}lnmiit`;
        }
        else if (riderExists(carpool.mapping)) {
            carpool.rider_count--;
            console.log("You've already booked this carpool ", carpool.mapping);
            return next(new utils_1.AppError(400, 'You have already booked this carpool'));
        }
        else {
            if (carpool.rider_count < carpool.capacity)
                carpool.rider_count++;
            else
                return next(new utils_1.AppError(400, 'Carpool maximum capacity reached'));
            // carpool.user_id.push(bookingUser);
            carpool.mapping = carpool.mapping + `${bookingUser.id}lnmiit`;
        }
        // if (carpool.rider_count < carpool.capacity) carpool.rider_count++;
        // else return next(new AppError(400, 'Carpool maximum capacity reached'));
        yield carpool.save();
        res.status(201).json({
            status: 'success',
            data: { carpool },
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
const leaveCarpool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const uid = user.id;
        const id = req.params.id;
        if (!user)
            return next(new utils_1.AppError(404, 'User not found'));
        const carpool = yield (0, services_1.findCarpoolById)({ id });
        if (!carpool)
            return next(new utils_1.AppError(404, 'Carpool not found'));
        if (uid === carpool.publisher_id)
            return next(new utils_1.AppError(403, 'Forbidden. You cannot leave your own carpool.'));
        console.log(carpool.user_id);
        if (carpool.rider_count === carpool.publisher_rider_count) {
            return next(new utils_1.AppError(400, 'You have not booked this carpool'));
        }
        // if (carpool.user_id.some(user => user.id === uid)) {
        //   carpool.user_id = carpool.user_id.filter(user => user.id !== uid);
        // } else return next(new AppError(404, 'Something went wrong.'));
        carpool.mapping = carpool.mapping.replace(`${uid}lnmiit`, '');
        carpool.rider_count--;
        yield carpool.save();
        res.status(201).json({
            status: 'success',
            data: { carpool },
            message: 'Carpool left successfully',
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
exports.leaveCarpool = leaveCarpool;
