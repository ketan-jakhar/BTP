require('dotenv').config;
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { findUserById, UserService } from '../services';
import { User } from '../types/entities';
import { SearchType } from '../types/enums';
import { AppError } from '../utils';

// Get user profile (self)
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: { id: string } = res.locals.user;
    if (!id) return next(new AppError(400, 'User not found'));
    const user = await findUserById({ id });
    if (!user) return next(new AppError(404, 'User not found'));
    res.status(200).json({
      status: 'success',
      data: user,
      message: 'User retrieved successfully',
    });
  } catch (err) {
    console.log('Error: (user.controller -> getProfile)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// Update user profile
export const updateProfile = async (
  req: Request<{}, {}, { payload: QueryDeepPartialEntity<User> }>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('REQ BODY - \n', req.body);
    const { payload }: { payload: QueryDeepPartialEntity<User> } = req.body;
    const { id }: { id: string } = res.locals.user;
    console.log('PAYLOAD - \n', payload);

    if (!id) return next(new AppError(400, 'User not found'));

    const userService = new UserService();
    const updatedUser = await userService.updateResource(id, payload);
    if (!updatedUser) return next(new AppError(400, 'User not found'));

    const user = await findUserById({ id });

    console.log('UPDATED USER - \n', updatedUser);

    res.status(200).json({
      status: 'success',
      data: { updatedUser, user },
      message: 'User updated successfully',
    });
  } catch (err: any) {
    console.log('Error: (user.controller -> updateProfile)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// Get all users
export const getAllUsers = async (
  req: Request<{}, {}, { params: any }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { params } = req.body;

    req.body.params = JSON.parse(JSON.stringify({}));
    const params = req.body.params;
    const userService = new UserService();
    let users;
    if (params.searchType == SearchType.COUNT)
      users = await userService.countResources(params);
    else users = await userService.listResources(params);
    res.status(200).json({
      status: 'success',
      data: { users },
      message: 'All Users data retrieved successfully',
    });
  } catch (err: any) {
    console.log('Error: (user.controller -> getAllUsers)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
