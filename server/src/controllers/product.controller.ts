require('dotenv').config;
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import moment from 'moment';
import { findProductById, ProductService } from '../services';
import { Product } from '../types/entities';
import { SearchType } from '../types/enums';
import { AppError, calculateCartTotal } from '../utils';

// recent orders from here only
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { params } = req.body;
    req.body.params = JSON.parse(JSON.stringify({}));
    const params = req.body.params;
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
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: { id: string } = req.params;
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
    const user_id: string = res.locals.user.id;
    const { payload }: { payload: QueryDeepPartialEntity<Product> } = req.body;
    const productService = new ProductService();
    const createdProduct = await productService.createResource({
      ...payload,
      user_id,
    });
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
    const { id }: { id: string } = req.params;
    const user_id: string = res.locals.user.id;
    const product = await findProductById({ id });
    if (!product) return next(new AppError(404, 'Product not found'));
    if (product.user_id !== user_id)
      return next(new AppError(401, 'Unauthorized'));
    const { payload }: { payload: QueryDeepPartialEntity<Product> } = req.body;
    const productService = new ProductService();
    const updatedProduct = await productService.updateResource(id, payload);
    res.status(200).json({
      status: 'success',
      data: { updatedProduct },
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
    const user_id: string = res.locals.user.id;
    const product = await findProductById({ id });
    if (!product) return next(new AppError(404, 'Product not found'));
    if (product.user_id !== user_id)
      return next(new AppError(401, 'Unauthorized'));
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

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = res.locals;
    if (!user) return next(new AppError(401, 'Unauthorized'));

    const { params } = req.body;
    const productService = new ProductService();
    const cart = await productService.listResources(params);
    const totalPrice = calculateCartTotal(cart);

    res.status(200).json({
      status: 'success',
      data: {
        cart,
        totalPrice,
      },
      message: 'Cart loaded successfully',
    });
  } catch (err) {
    console.log('Error: (product.controller -> getCart)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = res.locals;
    if (!user) return next(new AppError(401, 'Unauthorized'));

    const { id }: { id: string } = req.body;

    const { payload }: { payload: QueryDeepPartialEntity<Product> } = req.body;
    if (!payload) return next(new AppError(400, 'Invalid payload'));

    const product: Product | null = await findProductById({ id });
    if (!product) return next(new AppError(404, 'Product not found'));

    if (!product.is_available)
      return next(new AppError(400, 'Product not available for sell'));
    const productService = new ProductService();
    const cart = await productService.createResource(payload);

    res.status(200).json({
      status: 'success',
      data: { cart },
      message: 'Product added to cart successfully',
    });
  } catch (err) {
    console.log('Error: (product.controller -> addToCart)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = res.locals;
    if (!user) return next(new AppError(401, 'Unauthorized'));

    const { payload } = req.body;
    const productService = new ProductService();
    const cart = await productService.deleteResource(payload);

    res.status(200).json({
      status: 'success',
      data: { cart },
      message: 'Product removed from cart successfully',
    });
  } catch (err) {
    console.log('Error: (product.controller -> removeFromCart)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};

export const buyProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = res.locals;
    if (!user) return next(new AppError(401, 'Unauthorized'));
    const { params } = req.body;
    const productService = new ProductService();
    const cart = await productService.listResources(params);
    const updateResourcePayload: QueryDeepPartialEntity<Product> = {
      is_available: false,
      sell_time: moment().format('DD-MM-YYYY h:mm:ss a'),
    };

    const updateResourceErrorPayload: QueryDeepPartialEntity<Product> = {
      is_available: true,
      sell_time: '',
    };

    cart.forEach(async (product, index) => {
      try {
        const { id } = product;
        await productService.updateResource(id, updateResourcePayload);
        // generateInvoice(product);
      } catch (error) {
        if (index <= cart.length - 1 && index >= 0) {
          const count = index;
          cart.forEach(async (product, index) => {
            if (index <= count && index >= 0) {
              const { id } = product;
              await productService.updateResource(
                id,
                updateResourceErrorPayload
              );
            }
          });
        }
        console.log('Error: (product.controller -> buyProduct)', error);
        if (error instanceof Error)
          return next(new AppError(res.statusCode, error.message));
      }
    });

    res.status(200).json({
      status: 'success',
      data: { cart },
      message: 'Product bought successfully',
    });
  } catch (err) {
    console.log('Error: (product.controller -> buyProduct)', err);
    if (err instanceof Error)
      return next(new AppError(res.statusCode, err.message));
    else return next(new AppError(400, 'Something went Wrong'));
  }
};
