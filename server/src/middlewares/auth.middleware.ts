import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { findUserById } from '../services';
import { verifyToken, verifyJwt, AppError } from '../utils';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError(401, 'You are not logged in'));
    }

    // Validate the access token
    const decoded = verifyJwt(access_token, 'accessTokenPublicKey');

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    // Check if the user still exist
    const { id } = decoded as JwtPayload;
    const user = await findUserById({ id });
    if (!user) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    // Add user to res.locals
    res.locals.user = user;

    next();
  } catch (err: any) {
    console.log('Error: (auth.controller -> deserializeUser)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = res.locals;

    if (!user) {
      return next(
        new AppError(400, `Session has expired or user doesn't exist`)
      );
    }
    res.locals.user = user;
    next();
  } catch (err: any) {
    console.log('Error: (auth.controller -> requireUser)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const verifyTokenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate URL queries
    const queryObjectLength: number = Object.keys(req.query).length;
    console.log('queryObjectLength: ', queryObjectLength);
    const token = req.query.tk as string;
    const isValidToken: boolean = verifyToken(token).success;
    console.log(
      !(queryObjectLength === 1 && req.query.tk && isValidToken) ||
        req.query.tk === undefined
    );
    if (
      !(queryObjectLength === 1 && req.query.tk && isValidToken) ||
      req.query.tk === undefined
    ) {
      next(new AppError(400, 'Invalid URL'));
    }

    // Validate the token
    if (isValidToken) {
      const id: string = verifyToken(token).id as string;
      const user = await findUserById({ id });
      if (!user) {
        next(new AppError(401, 'User not found'));
      } else {
        console.log(
          'user.changePasswordToken: (auth.middleware -> verifyTokenUrl)',
          user.change_password_token
        );
        console.log('token: (VerifyTokenUrl -> verifyTokenUrl)', token);

        if (user.change_password_token !== token) {
          next(new AppError(401, 'Token Invalid or expired'));
        }

        res.locals.user = user;
        next();
      }
    } else {
      next(new AppError(401, 'Invalid Token'));
    }
  } catch (err: any) {
    console.log('Error: (auth.middleware -> verifyTokenUrl)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
