import { S3 } from 'aws-sdk';
import { Request, Response, NextFunction } from 'express';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  findProductById,
  findRecycleById,
  ProductService,
  s3Upload,
} from '../services';
import { Product, Recycle } from '../types/entities';
import { MulterRequest } from '../types/interfaces';
import { AppError } from '../utils';
const multer = require('multer');

export const homeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      status: 'success',
      data: null,
      message: 'Home Page loaded successfully',
    });
  } catch (err) {
    console.log('Error: (auth.controller -> getRegister)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const uploadImageHandler = async (
  req: MulterRequest | Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      category,
      payload,
    }: { category: string; payload: QueryDeepPartialEntity<Product> } =
      req.body;
    const id: string = req.params.id;
    const user_id: string = res.locals.user.id;

    let mreq: MulterRequest = req;
    let file = mreq.file;
    const result: S3.ManagedUpload.SendData = await s3Upload(
      file,
      category,
      id
    );
    console.log('Upload result: ', result);

    if (category === 'product') {
      const resource = await findProductById({ id });
      if (!resource) return next(new AppError(404, 'Resource not found'));
      if (resource.user_id !== user_id)
        return next(new AppError(401, 'Unauthorized'));
      const img_url = result.Location;

      resource.img_url = img_url;
      await resource.save();
      res.status(200).json({
        status: 'success',
        data: { result, resource, img_url },
      });
    } else if (category === 'recycle') {
      const resource = await findRecycleById({ id });
      if (!resource) return next(new AppError(404, 'Resource not found'));
      if (resource.user_id !== user_id)
        return next(new AppError(401, 'Unauthorized'));
      var img_url = result.Location;

      resource.img_url = img_url;
      await resource.save();
      res.status(200).json({
        status: 'success',
        data: { result, resource, img_url },
      });
    } else {
      return next(
        new AppError(400, 'Something wrong happened with the resource.')
      );
    }
  } catch (err: any) {
    console.log('Error: (misc.controller -> uploadImageHandler)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
