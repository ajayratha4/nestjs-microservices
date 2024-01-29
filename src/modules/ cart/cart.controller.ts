import {
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { GetUser, UserRequest } from 'src/decorator/user.decorator';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post(':id')
  async addToCart(
    @GetUser() user: UserRequest,
    @Param('id') productId: string,
  ) {
    return await this.cartService.addToCart(user.userId, productId);
  }

  @Delete(':id')
  async removeFromCart(
    @GetUser() user: UserRequest,
    @Param('id') productId: string,
  ) {
    return await this.cartService.removeFromCart(user.userId, productId);
  }
}
