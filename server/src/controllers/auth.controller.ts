require('dotenv').config;
import config from 'config';
import { Request, Response, NextFunction, CookieOptions } from 'express';
import bcrypt from 'bcryptjs';
import {
  CreateUserInput,
  ForgotPasswordInput,
  LoginUserInput,
} from '../schemas';
import {
  createUser,
  findUserByContactNumber,
  findUserByEmail,
  sendEmail,
} from '../services';
import {
  AppError,
  signTokens,
  clearCookies,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  verifyJwt,
  signJwt,
  generateToken,
} from '../utils';
import { User } from '../types/entities';
import { JwtPayload } from 'jsonwebtoken';
import { ObjectLiteral } from 'typeorm';

// GET /REGISTER
export const getRegisterHandler = (
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
    console.log('Error: (auth.controller -> getRegister)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// POST /REGISTER
export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      password,
      contact_number,
    }: { name: string; password: string; contact_number: number } = req.body;
    let { email }: { email: string } = req.body;

    // 1. Search if the user already exist
    const searchUserByEmail = await findUserByEmail({ email });
    if (searchUserByEmail)
      return next(new AppError(400, 'User with that email already exist'));

    const searchUserByContactNumber = await findUserByContactNumber({
      contact_number,
    });
    if (searchUserByContactNumber)
      return next(
        new AppError(400, 'User with that contact number already exist')
      );

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user
    const user = await createUser({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      contact_number,
    });

    // 4. Send the response
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    console.log('Error: (auth.controller -> register)', err);
    if (err.code === '23505') {
      return next(
        new AppError(
          400,
          'User with that email or contact number already exist'
        )
      );
    }
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// GET /LOGIN
export const getLoginHandler = (
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
  } catch (err: any) {
    console.log('Error: (auth.controller -> getLogin)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// POST /LOGIN
export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { password } = req.body;
    let { email } = req.body;

    const user = await findUserByEmail({ email: email.toLowerCase() });
    console.log('Auth User:(auth.controller -> login) ', user);

    // 1. Check if user exists and password is valid
    if (!user || !(await User.comparePasswords(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'));
    }

    // 2. Sign Access and Refresh Tokens
    const { access_token, refresh_token } = await signTokens(user);

    console.log('Access Token:(auth.controller -> login) ', access_token);
    console.log('Refresh Token:(auth.controller -> login) ', refresh_token);

    // 3. Add Cookies
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    console.log('Res.cookie: (auth.controller -> login)', res.cookie);

    // 4. Update last_login_at
    user.last_login_at = new Date();
    user.save();

    // 5. Send response
    res.status(200).json({
      status: 'success',
      access_token,
      last_login_at: user.last_login_at,
    });
  } catch (err: any) {
    console.log('Error: (auth.controller -> login)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// GET /LOGOUT
export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = res.locals;

    // 1. Clear Cookies
    clearCookies(res);

    // 2. Discard JWT
    // discardJwt();

    // 3. Send response
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  } catch (err: any) {
    console.log('Error: (auth.controller -> logout)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// GET Refresh access token
export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refresh_token } = req.cookies;

    const message: string = 'Could not refresh access token';

    // 1. Check if refresh token exists
    if (!refresh_token) {
      return next(new AppError(403, message));
    }

    // 2. Validate refresh token
    const decoded: string | JwtPayload | null = verifyJwt(
      refresh_token,
      'refreshTokenPublicKey'
    );

    console.log('Decoded:(auth.controller -> refreshtoken) ', decoded);

    if (!decoded) {
      return next(new AppError(403, message));
    }

    // TODO: change it
    const { email }: { email: string } = req.body;
    // 3. Check if the user still exists
    const user = (await findUserByEmail({ email })) as User;
    const { id, role }: { id: string; role: string } = user;

    const payload: ObjectLiteral = { id, role };

    // 4. Sign new access token
    const access_token = signJwt(payload, 'accessTokenPrivateKey', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    // 5. Add Cookies
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    console.log('Res.cookie: (auth.controller -> refreshtoken)', res.cookie);

    // 6. Send response
    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    console.log('Error: (auth.controller -> refreshTokenHandler)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// GET Change password
export const getForgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      status: 'success',
      message: 'Page loaded successfully',
    });
  } catch (err: any) {
    console.log('Error: (auth.controller -> getForgotPassword)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// POST Forgot password (Send Email for Verification)
export const forgotPasswordHandler = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = res.locals as { user: User };

    console.log(
      'User(res.locals.user):(auth.controller -> forgotPassword) ',
      user
    );

    const { token } = generateToken(user.id) as { token: string };
    if (!token) {
      return next(new AppError(500, 'Token not generated'));
    }
    user.change_password_token = token;
    await user.save();

    const url: string = `${req.protocol}://${req.hostname}:${config.get<number>(
      'port'
    )}/api/auth/change-password/?tk=${token}`;

    console.log('url: (userController -> createUserHandler)', url);

    // Email Payload
    const emailTo: string = '19ucc020@lnmiit.ac.in';
    const message: string = `Hello ${
      !!user.name ? user.name : 'User'
    },\nPlease click on the link below to change your password.\n${url}\nRegards,\nTeam GoodFind`;
    const subject: string = `Reset Password - GoodFind`;
    const emailFrom: string = 'ketanjakhar29@gmail.com';

    // Send Email
    sendEmail(emailTo, emailFrom, subject, message);

    return res.status(200).json({
      status: 'success',
      message: 'Email sent successfully',
    });
  } catch (err: any) {
    console.log('Error: (auth.controller -> forgotPassword)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
