import { InsertResult, Repository } from 'typeorm';
import { AbstractPaginationService } from '.';
import { AppDataSource, AppError } from '../utils';
import { Product } from '../types/entities';
import { CreateProductInput } from '../schemas';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

/**
 * Product Pagination Service
 */
export class ProductService extends AbstractPaginationService<Product> {
  protected getRepository(): Repository<Product> {
    return AppDataSource.getRepository(Product);
  }
}

const productRepository = AppDataSource.getRepository(Product);

export const createProduct = async (
  input: CreateProductInput
): Promise<Product> => {
  try {
    console.log('Product input', input);
    return (await AppDataSource.manager.save(
      AppDataSource.manager.create(
        Product,
        input as QueryDeepPartialEntity<Product>
      )
    )) as Product;
  } catch (error) {
    console.log('Error: (product.service -> createProduct)', error);
    if (error instanceof Error) throw new AppError(400, error.message);
    else throw new AppError(400, 'Something went Wrong');
  }
};

export const findProductById = async ({
  id,
}: {
  id: string;
}): Promise<Product | null> => {
  try {
    return await productRepository.findOneBy({ id });
  } catch (error: any) {
    console.log('Error: (product.service -> findProductById)', error);
    if (error instanceof Error) throw new AppError(400, error.message);
    else throw new AppError(400, 'Something went Wrong');
  }
};
