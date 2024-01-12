import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser() {
    return { msg: 'hello' };
  }
}
