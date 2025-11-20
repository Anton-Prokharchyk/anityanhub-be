import { Module } from '@nestjs/common';

import { UserService } from './users.service';
import { UserController } from './users.controller';
import { PrismaService } from 'src/common/adapters/prisma/prisma.service';
import { USER_REPOSITORY } from './users.repository.interface';
import { PrismaUserRepository } from './users.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
