import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/common/adapters/prisma/prisma.service';
import { UserModule } from 'src/modules/users/users.module';
import { CryptAdapter } from 'src/common/adapters/crypt/crypt.adapter';
import { JwtAdapter } from 'src/common/adapters/jwt/jwt.adapter';
import { CRYPT_LIB, JWT_LIB } from 'src/common/adapters/tokens';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    { provide: CRYPT_LIB, useClass: CryptAdapter },
    { provide: JWT_LIB, useClass: JwtAdapter },
  ],
})
export class AuthModule {}
