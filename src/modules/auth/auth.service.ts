import {
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
  Headers,
} from '@nestjs/common';

import { errorsMessages } from 'src/common/errors-messgaes.constants';
import { RegistrationUserDto } from '../auth/dto/register-user.dto';
import { UserService } from '../users/users.service';
import ICryptService from 'src/common/services/crypt/cryptService.interface';
import { CryptService } from 'src/common/services/crypt/crypt.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'generated/prisma/client';
import { JwtService } from 'src/common/services/jwt/jwt.service';
import { IJwtService } from 'src/common/services/jwt/jwtService.interface';
import { RegistrationReturnType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptService: ICryptService,
    private readonly jwtService: IJwtService,
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
    const user = await this.userService.findUserByName(loginUserDto.name);
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

  private async extractToken(@Headers('Authorization') authHeader: string) {
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token)
      throw new HttpException(
        errorsMessages.authMsgs.INVALID_TOKEN_ERROR,
        HttpStatus.UNAUTHORIZED,
      );
    return token;
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
