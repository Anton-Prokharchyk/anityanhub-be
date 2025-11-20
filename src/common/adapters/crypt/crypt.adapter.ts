import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

import { ICryptAdapter } from './crypt.adapter.interface';

@Injectable()
export class CryptAdapter implements ICryptAdapter {
  constructor(private readonly configService: ConfigService) {}
  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
  async genSalt(): Promise<string> {
    const saltRounds = Number(
      this.configService.get<string>('GENS_SALT_ROUNDS'),
    );
    return await bcrypt.genSalt(saltRounds);
  }
  async hash(password: string, salt: string | number): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
