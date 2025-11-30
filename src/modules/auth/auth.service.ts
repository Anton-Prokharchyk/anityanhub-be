import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';

import { errorsMessages } from 'src/common/errors-messgaes.constants';
import { RegistrationUserDto } from '../auth/dto/register-user.dto';
import { UserService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'generated/prisma/client';
import { IJwtAdapter } from 'src/common/adapters/jwt/jwt.adapter.interface';
import { RegistrationReturnType } from './types';
import { CRYPT_LIB, JWT_LIB } from 'src/common/adapters/tokens';
import { ICryptAdapter } from 'src/common/adapters/crypt/crypt.adapter.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(CRYPT_LIB) private readonly cryptService: ICryptAdapter,
    @Inject(JWT_LIB) private readonly jwtService: IJwtAdapter,
  ) {}

  async registration(
    registrationUserDto: RegistrationUserDto,
  ): Promise<RegistrationReturnType> {
    const salt = await this.cryptService.genSalt();
    const hashedPassword = await this.cryptService.hash(
      registrationUserDto.password,
      salt,
    );
    const userWithHashedPassword = {
      name: registrationUserDto.name,
      password: hashedPassword,
    };
    const newUser = await this.userService.createUser(userWithHashedPassword);
    if (!newUser)
      throw new HttpException(
        errorsMessages.authMsgs.USER_ALREADY_EXISTS_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    const token = await this.signToken(newUser);
    return { ...newUser, token };
  }

  async login(loginUserDto: LoginUserDto): Promise<boolean> {
    const user = await this.userService.findUserByName(loginUserDto.login);
    if (!user)
      throw new HttpException(
        errorsMessages.authMsgs.WRONG_NAME_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    const isCorrectPass = await this.cryptService.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isCorrectPass)
      throw new HttpException(
        errorsMessages.authMsgs.WRONG_PASS_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    return isCorrectPass;
  }

  private async signToken(payload: User) {
    return await this.jwtService.signToken({ ...payload });
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
