import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { GetUser, UserRequest } from 'src/decorator/user.decorator';

@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getuser(@GetUser() user: UserRequest) {
    return await this.userService.getUser(user.userId);
  }
}
