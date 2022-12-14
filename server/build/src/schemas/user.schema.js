"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../types/enums");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
            invalid_type_error: 'Please enter a valid name',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
        })
            .email('Invalid email address')
            .endsWith('@lnmiit.ac.in', 'Please use your lnmiit email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        password_confirm: (0, zod_1.string)({
            required_error: 'Please confirm your password',
        }),
        contact_number: (0, zod_1.number)({
            required_error: 'Contact number is required',
            invalid_type_error: 'Please enter a valid contact number',
        })
            .int('Contact number must be an integer')
            .positive('Contact number must be a positive number')
            .min(1000000000, 'Please enter a valid contact number')
            .max(9999999999, 'Please enter a valid contact number'),
        role: zod_1.z.optional(zod_1.z.nativeEnum(enums_1.UserRole)),
    }).refine(data => data.password === data.password_confirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    }),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email address is required',
            invalid_type_error: 'Please enter a valid name',
        })
            .email('Invalid email address')
            .endsWith('@lnmiit.ac.in', 'Please use your lnmiit email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
            invalid_type_error: 'Please enter a valid email address',
        }).min(8, 'Invalid email or password'),
    }),
});
exports.updateUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        payload: (0, zod_1.object)({
            name: (0, zod_1.string)({
                invalid_type_error: 'Please enter a valid name',
            }),
            email: (0, zod_1.string)({
                invalid_type_error: 'Please enter a valid email',
            })
                .email('Invalid email address')
                .endsWith('@lnmiit.ac.in', 'Please use your lnmiit email address'),
            contact_number: (0, zod_1.number)({
                invalid_type_error: 'Please enter a valid contact number',
            })
                .int('Contact number must be an integer')
                .positive('Contact number must be a positive number')
                .min(1000000000, 'Please enter a valid contact number')
                .max(9999999999, 'Please enter a valid contact number'),
        }),
    }),
});
