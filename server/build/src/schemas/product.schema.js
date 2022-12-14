"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        payload: (0, zod_1.object)({
            name: (0, zod_1.string)({
                required_error: 'Name is required',
                invalid_type_error: 'Please enter a valid name',
            }),
            price: (0, zod_1.number)({
                required_error: 'Price is required',
                invalid_type_error: 'Please enter a valid price',
            }),
            category: (0, zod_1.string)({
                required_error: 'Category is required',
                invalid_type_error: 'Please enter a valid category',
            }),
            description: (0, zod_1.string)({
                invalid_type_error: 'Please enter a valid category',
            }),
            additional_remarks: (0, zod_1.string)({
                invalid_type_error: 'Please enter a valid category',
            }).nullable(),
        }),
    }),
});
exports.updateProductSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            invalid_type_error: 'Please enter a valid name',
        }),
        price: (0, zod_1.number)({
            invalid_type_error: 'Please enter a valid price',
        }),
        category: (0, zod_1.string)({
            invalid_type_error: 'Please enter a valid category',
        }),
        description: (0, zod_1.string)({
            invalid_type_error: 'Please enter a valid category',
        }),
        additional_remarks: (0, zod_1.string)({
            invalid_type_error: 'Please enter a valid category',
        }),
    }),
});
