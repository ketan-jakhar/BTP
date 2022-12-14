"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            params: req.params,
            query: req.query,
            body: req.body,
        });
        next();
    }
    catch (error) {
        console.log('Error: (utils -> validate)', error);
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                status: 'error',
                error_name: error.name,
                message: error.issues[0].message,
                error_code: error.issues[0].code,
            });
        }
        next(error);
    }
};
exports.validate = validate;
