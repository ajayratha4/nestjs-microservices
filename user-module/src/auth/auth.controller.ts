import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: SignupDto) {
    console.log(body);
    return this.authService.signUp();
  }

  @Post('signin')
  signIn(@Body() body: SigninDto) {
    console.log(body);
    return this.authService.signIn();
  }
}
