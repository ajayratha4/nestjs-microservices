import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

export interface CustomRequest extends Request {
  user?: any; // Define the 'user' property on the extended Request interface
}

@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getuser(@Req() req: CustomRequest) {
    return await this.userService.getUser(req.user.userId);
  }
}
