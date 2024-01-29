import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { Model, Types } from 'mongoose';
import { Order } from 'src/database/schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(orderBody: CreateOrderDto) {
    return await new this.orderModel(orderBody).save();
  }

  async getOrdersByUserId(orderBy: string, limit: string, skip: string) {
    try {
      const order = await this.orderModel.aggregate([
        {
          $match: {
            orderBy: new Types.ObjectId(orderBy),
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productIds',
            foreignField: '_id',
            as: 'productIds',
          },
        },

        {
          $project: {
            'orderBy.password': 0,
            'orderBy.role': 0,
            'orderBy.createdAt': 0,
            'orderBy.updatedAt': 0,
            'productIds.price': 0,
            'productIds.stockQuantity': 0,
          },
        },
        {
          $skip: Number(skip),
        },
        {
          $limit: Number(limit),
        },
      ]);

      if (order.length === 0) {
        throw new NotFoundException('Order not found');
      }

      return order;
    } catch (error) {
      throw error;
    }
  }

  async getOrderDetails(id: string) {
    try {
      const order = await this.orderModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productIds',
            foreignField: '_id',
            as: 'productIds',
          },
        },

        {
          $project: {
            'orderBy.password': 0,
            'orderBy.role': 0,
            'orderBy.createdAt': 0,
            'orderBy.updatedAt': 0,
            'productIds.price': 0,
            'productIds.stockQuantity': 0,
          },
        },
      ]);

      if (order.length === 0) {
        throw new NotFoundException('Order not found');
      }

      return order;
    } catch (error) {
      throw error;
    }
  }
}
