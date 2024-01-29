import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addToCart(userId: string, productId: string) {
    return await this.userModel.updateOne(
      { _id: userId },
      { $addToSet: { cart: productId } },
    );
  }

  async removeFromCart(userId: string, productId: string) {
    return await this.userModel.updateOne(
      { _id: userId },
      { $pull: { cart: productId } },
    );
  }
}
