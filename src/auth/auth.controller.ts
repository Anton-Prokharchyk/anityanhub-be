import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from 'generated/prisma/client';
import {
  INTERNAL_SERVER_ERROR,
  USER_ALREADY_EXISTS_ERROR,
  WRONG_NAME_ERROR,
  WRONG_PASS_ERROR,
} from './auth.constants';
import { RegistrationUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(
    @Body() registrationUserDto: RegistrationUserDto,
  ): Promise<User> {
    const newUser = await this.authService.registration(registrationUserDto);
    if (newUser instanceof Error)
      throw new HttpException(
        USER_ALREADY_EXISTS_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    return newUser;
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    const isLogged = await this.authService.login(loginUserDto);
    if (isLogged === null)
      throw new HttpException(WRONG_NAME_ERROR, HttpStatus.BAD_REQUEST);
    if (!isLogged)
      throw new HttpException(WRONG_PASS_ERROR, HttpStatus.BAD_REQUEST);
    return 'logged in';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.authService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
