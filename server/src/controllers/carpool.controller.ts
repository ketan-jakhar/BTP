require('dotenv').config;
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CarpoolService, findCarpoolById } from '../services';
import { Carpool } from '../types/entities';
import { SearchType } from '../types/enums';
import { AppError } from '../utils';

// Get all carpools
export const getAllCarpools = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params } = req.body;

    const carpoolService = new CarpoolService();
    let carpools;
    if (params.searchType == SearchType.COUNT)
      carpools = await carpoolService.countResources(params);
    else carpools = await carpoolService.listResources(params);
    res.status(200).json({
      status: 'success',
      data: { carpools },
      message: 'All Carpools data retrieved successfully',
    });
  } catch (err) {
    console.log('Error: (carpool.controller -> getCarPool)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// Get carpool by id
export const getCarpoolById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const carpool = await findCarpoolById({ id });
    if (!carpool) return next(new AppError(404, 'Carpool not found'));
    return res.status(200).json({
      status: 'success',
      data: carpool,
      message: 'Carpool loaded successfully',
    });
  } catch (err: any) {
    console.log('Error: (carpool.controller -> getCabInfo)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

// Create carpool
export const createCarpool = async (
  req: Request<{}, {}, { payload: QueryDeepPartialEntity<Carpool> }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payload }: { payload: QueryDeepPartialEntity<Carpool> } = req.body;
    const carpoolService = new CarpoolService();
    const createdCarpool = await carpoolService.createResource(payload);

    const carpool = (await findCarpoolById({
      id: createdCarpool.identifiers[0].id,
    })) as Carpool;
    carpool.name = `${carpool.source} to ${carpool.destination}`;
    await carpool.save();

    res.status(201).json({
      status: 'success',
      data: { createdCarpool, carpool },
      message: 'Carpool created successfully',
    });
  } catch (err: any) {
    console.log('Error: (carpool.controller -> createCarpool)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const updateCarpool = async (
  req: Request<
    { id: string },
    {},
    { payload: QueryDeepPartialEntity<Carpool> }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { payload }: { payload: QueryDeepPartialEntity<Carpool> } = req.body;
    const carpoolService = new CarpoolService();
    const updatedCarpool = await carpoolService.updateResource(id, payload);
    res.status(200).json({
      status: 'success',
      data: { updatedCarpool },
      message: 'Carpool updated successfully',
    });
  } catch (err: any) {
    console.log('Error: (carpool.controller -> updateCarpool)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const deleteCarpool = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const carpoolService = new CarpoolService();
    const deletedCarpool = await carpoolService.deleteResource(id);
    res.status(200).json({
      status: 'success',
      data: { deletedCarpool },
      message: 'Carpool deleted successfully',
    });
  } catch (err: any) {
    console.log('Error: (carpool.controller -> deleteCarpool)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
