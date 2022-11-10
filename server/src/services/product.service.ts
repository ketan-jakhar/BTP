import { InsertResult, Repository } from 'typeorm';
import { AbstractPaginationService } from '.';
import { AppDataSource } from '../utils';
import { Product } from '../types/entities';
// import { CreateProductInput } from '../schemas';
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

export const createProduct = async (input: Product): Promise<Product> => {
  console.log('Product input', input);
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(Product, input)
  )) as Product;
};

export const findProductById = async ({
  id,
}: {
  id: string;
}): Promise<Product | null> => await productRepository.findOneBy({ id });
