import { InsertResult, Repository } from 'typeorm';
import { AbstractPaginationService } from '.';
import { AppDataSource } from '../utils';
import { Recycle } from '../types/entities';
// import { CreateRecycleInput } from '../schemas';
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

export const createRecycle = async (input: Recycle): Promise<Recycle> => {
  console.log('Recycle input', input);
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(Recycle, input)
  )) as Recycle;
};

export const findRecycleById = async ({
  id,
}: {
  id: string;
}): Promise<Recycle | null> => await recycleRepository.findOneBy({ id });
