import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/users.module';
import getMongoDbConfig from './configs/getMongoDbConfig';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
