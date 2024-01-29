import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrdersByUserId(
    @Query('orderBy') orderBy: string,
    @Query('limit') limit = '10',
    @Query('skip') skip = '0',
  ) {
    return await this.orderService.getOrdersByUserId(orderBy, limit, skip);
  }

  @Get(':id')
  async getOrderDetails(@Param('id') id: string) {
    return await this.orderService.getOrderDetails(id);
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    const createdOder = await this.orderService.createOrder(body);

    return { message: 'Order created successfully', createdOder };
  }
}
