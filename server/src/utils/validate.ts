import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      console.log('Error: (utils -> validate)', error);
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          error_name: error.name, // ZodError
          message: error.issues[0].message,
          error_code: error.issues[0].code,
        });
      }
      next(error);
    }
  };
