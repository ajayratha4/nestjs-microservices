import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/database/schemas/user.schema';

export interface UserRequest {
  name: string;
  email: string;
  role: Role;
  userId: string;
}

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): UserRequest => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
