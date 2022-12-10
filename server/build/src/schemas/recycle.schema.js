"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecycleSchema = exports.createRecycleSchema = void 0;
const zod_1 = require("zod");
exports.createRecycleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
            invalid_type_error: 'Please enter a valid name',
        }),
        category: (0, zod_1.string)({
            required_error: 'Category is required',
            invalid_type_error: 'Please enter a valid category',
        }),
        remarks: (0, zod_1.string)({
            invalid_type_error: 'Please enter a valid category',
        }),
    }),
});
exports.updateRecycleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            invalid_type_error: 'Please enter a valid name',
        }),
        category: (0, zod_1.string)({
            invalid_type_error: 'Please enter a valid category',
        }),
        remarks: (0, zod_1.string)({
            invalid_type_error: 'Please enter a valid category',
        }),
    }),
});
