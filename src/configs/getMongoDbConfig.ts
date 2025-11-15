import { ConfigService } from '@nestjs/config';

export default function getMongoDbConfig(configService: ConfigService) {
  // return { uri: 'mongodb://ath-mongodb:27017/?authSource=admin' }; // docker url
  return {
    uri: configService.get<string>('MONGO_DB_URI'),
  }; // localhost url
}
// TODO: add uri and options object builder functions
