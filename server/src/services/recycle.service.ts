import { InsertResult, Repository } from 'typeorm';
import { AbstractPaginationService } from '.';
import { AppDataSource, AppError } from '../utils';
import { Recycle } from '../types/entities';
import { CreateRecycleInput } from '../schemas';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

/**
 * Recycle Pagination Service
 */
export class RecycleService extends AbstractPaginationService<Recycle> {
  protected getRepository(): Repository<Recycle> {
    return AppDataSource.getRepository(Recycle);
  }
}

const recycleRepository = AppDataSource.getRepository(Recycle);

export const createRecycle = async (
  input: CreateRecycleInput
): Promise<Recycle> => {
  try {
    console.log('Recycle input', input);
    return (await AppDataSource.manager.save(
      AppDataSource.manager.create(
        Recycle,
        input as QueryDeepPartialEntity<Recycle>
      )
    )) as Recycle;
  } catch (error) {
    console.log('Error: (recycle.service -> createRecycle)', error);
    if (error instanceof Error) throw new AppError(400, error.message);
    else throw new AppError(400, 'Something went Wrong');
  }
};

export const findRecycleById = async ({
  id,
}: {
  id: string;
}): Promise<Recycle | null> => {
  try {
    return await recycleRepository.findOneBy({ id });
  } catch (error) {
    console.log('Error: (recycle.service -> findRecycleById)', error);
    if (error instanceof Error) throw new AppError(400, error.message);
    else throw new AppError(400, 'Something went Wrong');
  }
};
