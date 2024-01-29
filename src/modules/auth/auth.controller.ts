import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto/auth.dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignupDto) {
    const user = await this.authService.signUp(body);

    const payload = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const access_token = await this.authService.generateAccessToken(payload);
    const refresh_token = await this.authService.generateRefreshToken({
      userId: user._id,
    });

    return { access_token, refresh_token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() body: SigninDto) {
    const user = await this.authService.signIn(body);

    const payload = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const access_token = await this.authService.generateAccessToken(payload);
    const refresh_token = await this.authService.generateRefreshToken({
      userId: user._id,
    });

    return { access_token, refresh_token };
  }
}
