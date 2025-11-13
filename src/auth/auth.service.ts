import { Inject, Injectable } from '@nestjs/common';

import { RegistrationUserDto } from '../auth/dto/register-user.dto';
import { UserService } from '../user/user.service';
import ICryptService from 'src/cryptService/cryptService.interface';
import { CryptService } from 'src/cryptService/crypt.service';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @Inject(CryptService) private readonly cryptService: ICryptService,
  ) {}

  async registration(registrationUserDto: RegistrationUserDto): Promise<User> {
    const saltRounds = Number(this.configService.get('GENS_SALT_ROUNDS'));
    const salt = await this.cryptService.genSalt(saltRounds);
    const hashedPassword = await this.cryptService.hash(
      registrationUserDto.password,
      salt,
    );
    const userWithHashedPassword = {
      name: registrationUserDto.name,
      password: hashedPassword,
    };
    return await this.userService.createUser(userWithHashedPassword);
  }

  async login(loginUserDto: LoginUserDto): Promise<boolean | null> {
    const user = await this.userService.findUserByName(loginUserDto.name);
    if (!user) return user;
    return await this.cryptService.compare(
      loginUserDto.password,
      user.password,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
