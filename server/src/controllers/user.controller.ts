require('dotenv').config;
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { findUserById, UserService } from '../services';
import { User } from '../types/entities';
import { SearchType } from '../types/enums';
import { AppError } from '../utils';

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

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payload }: { payload: QueryDeepPartialEntity<User> } = req.body;
    const { id }: { id: string } = res.locals.user;
    if (!id) return next(new AppError(400, 'User not found'));

    const userService = new UserService();
    const resource = await userService.updateResource(id, payload);
    if (!resource) return next(new AppError(400, 'User not founddd'));

    const user = await findUserById({ id });

    console.log('UPDATED USER - \n', resource);

    res.status(200).json({
      status: 'success',
      data: { resource, user },
      message: 'User updated successfully',
    });
  } catch (err: any) {
    console.log('Error: (user.controller -> updateProfile)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params } = req.body;

    const userService = new UserService();
    let users;
    if (params.searchType == SearchType.COUNT)
      users = await userService.countResources(params);
    else users = await userService.listResources(params);
    res.status(200).json({
      status: 'success',
      data: { users },
      message: 'Users retrieved successfully',
    });
  } catch (err: any) {
    console.log('Error: (user.controller -> getAllUsers)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
