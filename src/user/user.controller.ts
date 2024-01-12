import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getuser() {
    return await this.userService.getUser();
  }
}
