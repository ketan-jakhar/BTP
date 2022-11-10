import { Repository, UpdateResult, InsertResult, DeleteResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { generateQuery } from '../helpers';
import { BaseResource } from '../types/entities';
import { SearchParams, QueryParams } from '../types/interfaces';

/**
 * Generic Pagination Service
 */
export abstract class AbstractPaginationService<T extends BaseResource> {
  protected abstract getRepository(): Repository<T>;

  public async upsertResource(
    payload: QueryDeepPartialEntity<T>,
    conflictPathsArray: string[]
  ): Promise<InsertResult> {
    const repository: Repository<T> = this.getRepository();
    console.log(
      'payload (abstract-pagination-service.ts -> upsertResource):- \n',
      payload
    );
    const data = await repository.upsert(payload, {
      conflictPaths: conflictPathsArray,
      skipUpdateIfNoValuesChanged: true,
    });
    console.log('upsertdata: ', data);
    return data;
  }

  public async createResource(
    payload: QueryDeepPartialEntity<T>
  ): Promise<InsertResult> {
    const repository: Repository<T> = this.getRepository();
    console.log(
      'payload (abstract-pagination-service.ts -> createResource):- \n',
      payload
    );

    return await repository.insert(payload);
  }

  public async listResources(params: SearchParams): Promise<T[]> {
    const repository: Repository<T> = this.getRepository();
    const queryParams: QueryParams = generateQuery(params);

    return await repository.find(queryParams as {});
  }

  public countResources = async (params: SearchParams) => {
    const repository: Repository<T> = this.getRepository();
    const queryParams: QueryParams = generateQuery(params);

    return await repository.count(queryParams as {});
  };

  public async updateResource(
    id: string,
    payload: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    const repository: Repository<T> = this.getRepository();

    return await repository.update(id, payload);
  }

  public async deleteResource(id: string): Promise<DeleteResult> {
    const repository: Repository<T> = this.getRepository();

    return await repository.delete(id);
  }
}
