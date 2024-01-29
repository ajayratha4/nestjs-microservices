import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/database/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SigninDto, SignupDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const saltOrRounds = Number(this.configService.get('SALT'));
    return await bcrypt.hash(password, saltOrRounds);
  }

  async matchHashPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async generateAccessToken(payload: any): Promise<string> {
    return await this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXP'),
    });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
    });
  }

  async signUp(user: SignupDto) {
    try {
      user.password = await this.hashPassword(user.password);
      return await new this.userModel(user).save();
    } catch (error) {
      return error;
    }
  }
  async signIn(body: SigninDto) {
    try {
      const user = await this.userModel.findOne({ email: body.email });

      if (!user) throw new NotFoundException('User not found');

      const checkHashPassword = await this.matchHashPassword(
        body.password,
        user.password,
      );

      if (!checkHashPassword)
        throw new NotFoundException('invalid credentials');
      return user;
    } catch (error) {
      return error;
    }
  }
}
