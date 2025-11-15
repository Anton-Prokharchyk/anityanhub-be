import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegistrationUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegistrationReturnType } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(
    @Body() registrationUserDto: RegistrationUserDto,
  ): Promise<RegistrationReturnType> {
    return await this.authService.registration(registrationUserDto);
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ isLoggedIn: boolean }> {
    const isLoggedIn = await this.authService.login(loginUserDto);
    return { isLoggedIn };
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
