import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserService {
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${updateUserDto} ${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
