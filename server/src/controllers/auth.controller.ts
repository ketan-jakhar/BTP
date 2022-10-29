require('dotenv').config;
import config from 'config';
import { Request, Response, NextFunction, CookieOptions } from 'express';
import { AppError } from '../utils';

// Cookie Options
export const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

// Access Token Cookie Options
export const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

// Refresh Token Cookie Options
export const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
};

const clearCookies = (res: Response) => {
  res.cookie('access_token', '', { maxAge: -1 });
  res.cookie('refresh_token', '', { maxAge: -1 });
  res.cookie('logged_in', '', { maxAge: -1 });
  console.log('Res.cookie: (auth.controller -> logout)', res.cookie);
};

// GET /REGISTER
export const getRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      status: 'success',
      data: null,
      message: 'Page loaded successfully',
    });
  } catch (err) {
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));

    //     if (err instanceof Error) {
    //       console.log(err);
    //       return res.json({
    //         status: 'error',
    //         data: null,
    //         message: err.message,
    //         statusCode: res.statusCode,
    //       });
    //     } else {
    //       return res.json({
    //         status: 'error',
    //         data: null,
    //         message: 'Something went wrong',
    //         statusCode: res.statusCode,
    //       });
    //     }
    //   }
  }
};
export const register = (req: Request, res: Response, next: NextFunction) => {};

export const getLogin = (req: Request, res: Response, next: NextFunction) => {};
export const login = (req: Request, res: Response, next: NextFunction) => {};
export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;

    clearCookies(res);
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  } catch (err: any) {
    console.log(err);

    next(err);
  }
};
