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
exports.uploadImageHandler = exports.homeHandler = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const multer = require('multer');
const homeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({
            status: 'success',
            data: null,
            message: 'Home Page loaded successfully',
        });
    }
    catch (err) {
        console.log('Error: (auth.controller -> getRegister)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.homeHandler = homeHandler;
const uploadImageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, payload, } = req.body;
        const id = req.params.id;
        const user_id = res.locals.user.id;
        let mreq = req;
        let file = mreq.file;
        const result = yield (0, services_1.s3Upload)(file, category, id);
        console.log('Upload result: ', result);
        if (category === 'product') {
            const resource = yield (0, services_1.findProductById)({ id });
            if (!resource)
                return next(new utils_1.AppError(404, 'Resource not found'));
            if (resource.user_id !== user_id)
                return next(new utils_1.AppError(401, 'Unauthorized'));
            const img_url = result.Location;
            resource.img_url = img_url;
            yield resource.save();
            res.status(200).json({
                status: 'success',
                data: { result, resource, img_url },
            });
        }
        else if (category === 'recycle') {
            const resource = yield (0, services_1.findRecycleById)({ id });
            if (!resource)
                return next(new utils_1.AppError(404, 'Resource not found'));
            if (resource.user_id !== user_id)
                return next(new utils_1.AppError(401, 'Unauthorized'));
            var img_url = result.Location;
            resource.img_url = img_url;
            yield resource.save();
            res.status(200).json({
                status: 'success',
                data: { result, resource, img_url },
            });
        }
        else {
            return next(new utils_1.AppError(400, 'Something wrong happened with the resource.'));
        }
    }
    catch (err) {
        console.log('Error: (misc.controller -> uploadImageHandler)', err);
        if (err instanceof Error)
            return next(new utils_1.AppError(res.statusCode, err.message));
        else
            return next(new utils_1.AppError(400, 'Something went Wrong'));
    }
});
exports.uploadImageHandler = uploadImageHandler;
