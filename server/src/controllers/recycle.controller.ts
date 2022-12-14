require('dotenv').config;
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { findRecycleById, RecycleService } from '../services';
import { Recycle } from '../types/entities';
import { SearchType } from '../types/enums';
import { AppError } from '../utils';

// recent recycles from here only
export const getAllRecycleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { params } = req.body;
    req.body.params = JSON.parse(JSON.stringify({}));
    const params = req.body.params;

    const recycleService = new RecycleService();
    let recycles;
    if (params.searchType == SearchType.COUNT)
      recycles = await recycleService.countResources(params);
    else recycles = await recycleService.listResources(params);
    res.status(200).json({
      status: 'success',
      data: { recycles },
      message: 'All Recycles data retrieved successfully',
    });
  } catch (err) {
    console.log('Error: (recycle.controller -> getAllRecycles)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// get one recycle by id
export const getOneRecycleHandler = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: { id: string } = req.params;
    const recycle = await findRecycleById({ id });
    if (!recycle) return next(new AppError(404, 'Recycle not found'));
    return res.status(200).json({
      status: 'success',
      data: recycle,
      message: 'Recycle loaded successfully',
    });
  } catch (err: any) {
    console.log('Error: (recycle.controller -> getRecycleById)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// create a new recycle
export const createRecycleHandler = async (
  req: Request<{}, {}, { payload: QueryDeepPartialEntity<Recycle> }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id: string = res.locals.user.id;
    const { payload }: { payload: QueryDeepPartialEntity<Recycle> } = req.body;
    const recycleService = new RecycleService();
    const createdRecycle = await recycleService.createResource({
      ...payload,
      user_id,
    });
    res.status(201).json({
      status: 'success',
      data: createdRecycle,
      message: 'Recycle created successfully',
    });
  } catch (err) {
    console.log('Error: (recycle.controller -> createRecycle)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// update a recycle
export const updateRecycleHandler = async (
  req: Request<
    { id: string },
    {},
    { payload: QueryDeepPartialEntity<Recycle> }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: { id: string } = req.params;
    const { payload }: { payload: QueryDeepPartialEntity<Recycle> } = req.body;
    const recycleService = new RecycleService();
    const updatedRecycle = await recycleService.updateResource(id, payload);
    res.status(200).json({
      status: 'success',
      data: { updatedRecycle },
      message: 'Recycle updated successfully',
    });
  } catch (err) {
    console.log('Error: (recycle.controller -> updateRecycle)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// delete a recycle
export const deleteRecycleHandler = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const recycleService = new RecycleService();
    const deletedRecycle = await recycleService.deleteResource(id);
    res.status(200).json({
      status: 'success',
      data: { deletedRecycle },
      message: 'Recycle deleted successfully',
    });
  } catch (err) {
    console.log('Error: (recycle.controller -> deleteRecycle)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
