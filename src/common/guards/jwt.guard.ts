import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { errorsMessages } from '../errors-messgaes.constants';
import { IJwtService } from '../services/jwt/jwtService.interface';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly JwtService: IJwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new HttpException(
        errorsMessages.authMsgs.INVALID_TOKEN_ERROR,
        HttpStatus.UNAUTHORIZED,
      );
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token)
      throw new HttpException(
        errorsMessages.authMsgs.INVALID_TOKEN_ERROR,
        HttpStatus.UNAUTHORIZED,
      );

    return true;
  }
}
