require('dotenv').config;
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CarpoolService, findCarpoolById, findUserById } from '../services';
import { Carpool, User } from '../types/entities';
import { SearchType } from '../types/enums';
import { AppError } from '../utils';

// Get all carpools
export const getAllCarpools = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.params = JSON.parse(JSON.stringify({}));
    const params = req.body.params;
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
    const { id }: { id: string } = res.locals.user;
    if (!id) return next(new AppError(401, 'Unauthorized'));
    const { payload }: { payload: QueryDeepPartialEntity<Carpool> } = req.body;
    const carpoolService = new CarpoolService();
    const createdCarpool = await carpoolService.createResource({
      ...payload,
      publisher_rider_count: payload.rider_count,
      publisher_id: id,
    });

    const carpool = (await findCarpoolById({
      id: createdCarpool.identifiers[0].id,
    })) as Carpool;
    carpool.name = `${carpool.source} to ${carpool.destination}`;
    const setDepartureTime = new Date(payload.departure_time as string);
    carpool.departure_time = setDepartureTime;
    // carpool.publisher_rider_count = carpool.rider_count;
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

// Update carpool
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
    const user_id: string = res.locals.user.id;
    const carpool = await findCarpoolById({ id });
    if (!carpool) return next(new AppError(404, 'carpool not found'));
    if (carpool.publisher_id !== user_id)
      return next(new AppError(401, 'Unauthorized'));
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

// Delete carpool
export const deleteCarpool = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user_id: string = res.locals.user.id;
    const carpool = await findCarpoolById({ id });
    if (!carpool) return next(new AppError(404, 'carpool not found'));
    if (carpool.publisher_id !== user_id)
      return next(new AppError(401, 'Unauthorized'));
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

// Join carpool
export const joinCarpool = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const uid: string = user.id;
    const { id }: { id: string } = req.params;

    if (!user) return next(new AppError(404, 'User not found'));

    const carpool: Carpool | null = await findCarpoolById({ id });
    if (!carpool) return next(new AppError(404, 'Carpool not found'));

    // if (carpool.rider_count < carpool.capacity) carpool.rider_count++;
    // else return next(new AppError(400, 'Carpool maximum capacity reached'));

    // const { payload }: { payload: QueryDeepPartialEntity<Carpool> } = req.body;
    // const carpoolService = new CarpoolService();
    // const createBooking = await carpoolService.updateResource(id, payload);
    const bookingUser = await findUserById({ id: uid });

    if (!bookingUser) return next(new AppError(404, 'User not found'));

    if (bookingUser.id !== uid)
      return next(
        new AppError(404, 'Unauthorized request: Attempt to breach.')
      );

    if (bookingUser.id === carpool.publisher_id)
      return next(
        new AppError(403, 'Forbidden. You cannot book your own carpool.')
      );
    console.log(carpool.user_id);

    const riderExists = (str: string) => {
      let arr = str.split('lnmiit');
      for (let e in arr) {
        if (e === bookingUser.id) return true;
      }
      return false;
    };

    if (carpool.user_id === null || carpool.user_id === undefined) {
      if (carpool.rider_count < carpool.capacity) carpool.rider_count++;
      else return next(new AppError(400, 'Carpool maximum capacity reached'));
      // carpool.user_id = [bookingUser];
      if (carpool.mapping.includes(`${bookingUser.id}lnmiit`)) {
        return next(new AppError(400, 'You have already booked this carpool'));
      } else carpool.mapping += `${bookingUser.id}lnmiit`;
    } else if (riderExists(carpool.mapping)) {
      carpool.rider_count--;
      console.log("You've already booked this carpool ", carpool.mapping);
      return next(new AppError(400, 'You have already booked this carpool'));
    } else {
      if (carpool.rider_count < carpool.capacity) carpool.rider_count++;
      else return next(new AppError(400, 'Carpool maximum capacity reached'));
      // carpool.user_id.push(bookingUser);
      carpool.mapping = carpool.mapping + `${bookingUser.id}lnmiit`;
    }

    // if (carpool.rider_count < carpool.capacity) carpool.rider_count++;
    // else return next(new AppError(400, 'Carpool maximum capacity reached'));

    await carpool.save();
    res.status(201).json({
      status: 'success',
      data: { carpool },
      message: 'Booking created successfully',
    });
  } catch (err: any) {
    console.log('Error: (carpool.controller -> createBooking)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const leaveCarpool = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const uid: string = user.id;
    const id: string = req.params.id;

    if (!user) return next(new AppError(404, 'User not found'));

    const carpool = await findCarpoolById({ id });
    if (!carpool) return next(new AppError(404, 'Carpool not found'));

    if (uid === carpool.publisher_id)
      return next(
        new AppError(403, 'Forbidden. You cannot leave your own carpool.')
      );
    console.log(carpool.user_id);

    if (carpool.rider_count === carpool.publisher_rider_count) {
      return next(new AppError(400, 'You have not booked this carpool'));
    }

    // if (carpool.user_id.some(user => user.id === uid)) {
    //   carpool.user_id = carpool.user_id.filter(user => user.id !== uid);
    // } else return next(new AppError(404, 'Something went wrong.'));

    carpool.mapping = carpool.mapping.replace(`${uid}lnmiit`, '');
    carpool.rider_count--;

    await carpool.save();
    res.status(201).json({
      status: 'success',
      data: { carpool },
      message: 'Carpool left successfully',
    });
  } catch (err: any) {
    console.log('Error: (carpool.controller -> createBooking)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
