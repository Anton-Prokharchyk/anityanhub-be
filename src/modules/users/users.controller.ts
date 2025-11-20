import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';

import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'generated/prisma/browser';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User | Error> {
    console.log('get user by id');
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (err) {
      throw new HttpException('Try again later', 500);
    }
  }

  @Get('/')
  async getAllUsers(): Promise<User[] | Error> {
    console.log('get all users');
    try {
      return await this.userService.findAll();
    } catch (err) {
      throw new HttpException('Try again later', 500);
    }
  }

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto): Promise<User | Error> {
    console.log('create user');
    try {
      return await this.userService.createUser(dto);
    } catch (err) {
      throw new HttpException('Try again later', 500);
    }
  }
}
