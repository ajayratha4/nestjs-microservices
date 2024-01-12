import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/database/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUp(body) {
    return await new this.userModel(body).save();
  }
  async signIn(body) {
    const user = await this.userModel.findOne({ email: body.email });
    if (user.password === body.password) return user;
    throw new NotFoundException('User not found');
  }
}
