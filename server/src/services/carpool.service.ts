import { InsertResult, Repository } from 'typeorm';
import { AbstractPaginationService } from '.';
import { AppDataSource } from '../utils';
import { Carpool } from '../types/entities';
// import { CreateCarpoolInput } from '../schemas';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

/**
 * Carpool Pagination Service
 */
export class CarpoolService extends AbstractPaginationService<Carpool> {
  protected getRepository(): Repository<Carpool> {
    return AppDataSource.getRepository(Carpool);
  }
}

const carpoolRepository = AppDataSource.getRepository(Carpool);
//use moment.js to set date

export const createCarpool = async (input: Carpool): Promise<Carpool> => {
  console.log('Carpool input', input);
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(Carpool, input)
  )) as Carpool;
};

export const findCarpoolById = async ({
  id,
}: {
  id: string;
}): Promise<Carpool | null> => await carpoolRepository.findOneBy({ id });
