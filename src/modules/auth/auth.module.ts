import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UserModule } from 'src/modules/users/users.module';
import { CryptService } from 'src/common/services/crypt/crypt.service';
import { JwtService } from 'src/common/services/jwt/jwt.service';
import ICryptService from 'src/common/services/crypt/cryptService.interface';
import { IJwtService } from 'src/common/services/jwt/jwtService.interface';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    { provide: IJwtService, useClass: JwtService },
    { provide: ICryptService, useClass: CryptService },
    { provide: 'JWT_LIB', useFactory: () => require('jsonwebtoken') },
  ],
})
export class AuthModule {}
