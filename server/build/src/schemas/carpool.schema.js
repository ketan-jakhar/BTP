"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCarpoolSchema = exports.createCarpoolSchema = void 0;
const zod_1 = require("zod");
exports.createCarpoolSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        payload: (0, zod_1.object)({
            source: (0, zod_1.string)({
                required_error: 'Source is required',
                invalid_type_error: 'Please enter a valid source',
            }),
            destination: (0, zod_1.string)({
                required_error: 'Destination is required',
                invalid_type_error: 'Please enter a valid destination',
            }),
            departure_time: (0, zod_1.string)({
                required_error: 'Time is required',
                invalid_type_error: 'Please enter a valid time',
            }),
            rider_count: (0, zod_1.number)({
                required_error: 'Rider count is required',
                invalid_type_error: 'Please enter a valid rider count',
            }),
            capacity: (0, zod_1.number)({
                required_error: 'Seats is required',
                invalid_type_error: 'Please enter a valid seats',
            }),
            estimated_price: (0, zod_1.number)({
                required_error: 'Price is required',
                invalid_type_error: 'Please enter a valid price',
            }),
            additional_remarks: (0, zod_1.string)({
                invalid_type_error: 'Please enter a valid additional_remarks',
            }),
        }),
    }),
});
exports.updateCarpoolSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        payload: (0, zod_1.object)({
            additional_remarks: (0, zod_1.string)({
                required_error: 'Additional remarks is required to proceed',
                invalid_type_error: 'Please enter a valid additional_remarks',
            }),
        }),
    }),
});
