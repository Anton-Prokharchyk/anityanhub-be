import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import getMongoDbConfig from './configs/getMongoDbConfig';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRootAsync({ useFactory: getMongoDbConfig }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
