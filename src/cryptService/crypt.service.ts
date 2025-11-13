import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import ICryptService from './cryptService.interface';

@Injectable()
export class CryptService implements ICryptService {
  constructor() {}
  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
  async genSalt(rounds: number): Promise<string> {
    return await bcrypt.genSalt(rounds);
  }
  async hash(password: string, salt: string | number): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
