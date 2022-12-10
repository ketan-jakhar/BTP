import { InsertResult, Repository } from 'typeorm';
import { AbstractPaginationService } from '.';
import { AppDataSource } from '../utils';
import { User } from '../types/entities';
import { CreateUserInput } from '../schemas';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

/**
 * User Pagination Service
 */
export class UserService extends AbstractPaginationService<User> {
  protected getRepository(): Repository<User> {
    return AppDataSource.getRepository(User);
  }
}

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: CreateUserInput): Promise<User> => {
  console.log('Carpool input', input);
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(User, input)
  )) as User;
};

export const findUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<User | null> => await userRepository.findOneBy({ email });

export const findUserById = async ({
  id,
}: {
  id: string;
}): Promise<User | null> => await userRepository.findOneBy({ id });

export const findUserByContactNumber = async ({
  contact_number,
}: {
  contact_number: number;
}): Promise<User | null> => await userRepository.findOneBy({ contact_number });
