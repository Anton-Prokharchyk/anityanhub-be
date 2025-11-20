import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/adapters/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'generated/prisma/client';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class PrismaUserRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findUserByName(name: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { name } });
  }
}
