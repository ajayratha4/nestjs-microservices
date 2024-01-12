import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp() {
    return { id: 123 };
  }
  signIn() {
    return { id: 55 };
  }
}
