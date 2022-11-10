require('dotenv').config;
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { findProductById, ProductService } from '../services';
import { Product } from '../types/entities';
import { SearchType } from '../types/enums';
import { AppError } from '../utils';

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params } = req.body;

    const productService = new ProductService();
    let products;
    if (params.searchType == SearchType.COUNT)
      products = await productService.countResources(params);
    else products = await productService.listResources(params);
    res.status(200).json({
      status: 'success',
      data: { products },
      message: 'All Products data retrieved successfully',
    });
  } catch (err) {
    console.log('Error: (product.controller -> getAllProducts)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await findProductById({ id });
    if (!product) return next(new AppError(404, 'Product not found'));
    return res.status(200).json({
      status: 'success',
      data: product,
      message: 'Product loaded successfully',
    });
  } catch (err: any) {
    console.log('Error: (product.controller -> getProductById)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const createProduct = async (
  req: Request<{}, {}, { payload: QueryDeepPartialEntity<Product> }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payload }: { payload: QueryDeepPartialEntity<Product> } = req.body;
    const productService = new ProductService();
    const createdProduct = await productService.createResource(payload);
    res.status(201).json({
      status: 'success',
      data: createdProduct,
      message: 'Product created successfully',
    });
  } catch (err) {
    console.log('Error: (product.controller -> createProduct)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const updateProduct = async (
  req: Request<
    { id: string },
    {},
    { payload: QueryDeepPartialEntity<Product> }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { payload }: { payload: QueryDeepPartialEntity<Product> } = req.body;
    const productService = new ProductService();
    const updatedProduct = await productService.updateResource(id, payload);
    res.status(200).json({
      status: 'success',
      data: { updateProduct },
      message: 'Product updated successfully',
    });
  } catch (err) {
    console.log('Error: (product.controller -> updateProduct)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productService = new ProductService();
    const deletedProduct = await productService.deleteResource(id);
    res.status(200).json({
      status: 'success',
      data: { deletedProduct },
      message: 'Product deleted successfully',
    });
  } catch (err) {
    console.log('Error: (product.controller -> deleteProduct)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
