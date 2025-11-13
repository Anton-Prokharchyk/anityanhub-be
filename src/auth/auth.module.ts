import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/Prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { CryptService } from 'src/cryptService/crypt.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, CryptService],
})
export class AuthModule {}
