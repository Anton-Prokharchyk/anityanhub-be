import { User } from 'generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

export interface IUsersRepository {
  createUser(createUserDto: CreateUserDto): Promise<User>;

  findAll(): Promise<User[]>;

  findUserById(id: string): Promise<User | null>;

  findUserByName(name: string): Promise<User | null>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
