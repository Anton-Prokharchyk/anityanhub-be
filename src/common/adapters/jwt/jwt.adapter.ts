import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';

import { errorsMessages } from 'src/common/errors-messgaes.constants';
import { IJwtAdapter } from './jwt.adapter.interface';

@Injectable()
export class JwtAdapter implements IJwtAdapter {
  private readonly secret: string;
  private readonly expiresIn: StringValue;
  constructor(private readonly configService: ConfigService) {
    const secret = this.configService.get<string>('JWT_SECRET');
    console.log('JWT_SECRET:', secret);
    if (!secret) {
      throw new HttpException(
        errorsMessages.configMsgs.JWT_SECRET_NOT_FOUND,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.secret = secret;
    this.expiresIn = (this.configService.get<string>('JWT_EXPIRES_IN') ||
      '24h') as StringValue;
  }

  async signToken(payload: string | Buffer | object): Promise<string> {
    const options: jwt.SignOptions = { expiresIn: this.expiresIn };
    return jwt.sign(payload, this.secret, options);
  }

  async verifyToken(tokenToVerify: string): Promise<string | unknown> {
    return jwt.verify(tokenToVerify, this.secret);
  }
}
