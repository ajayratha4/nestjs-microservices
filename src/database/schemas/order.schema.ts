import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';
import { User } from './user.schema';

export interface OrderPrice {
  productPrices: number;
  discounts: number;
  other: number;
  paidPrice: number;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  CONFIRMED = 'Confirmed',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  PARTIALLY_SHIPPED = 'Partially Shipped',
  CANCELLED = 'Cancelled',
  REFUNDED = 'Refunded',
  ON_HOLD = 'On Hold',
  BACKORDERED = 'Backordered',
}

export enum PaymentTypeEnum {
  RozerPay = 'RozerPay',
  COD = 'COD',
}

export enum StatusEnum {
  Success = 'Success',
  Pending = 'Pending',
  Failed = 'Failed',
}

export interface PaymentDetails {
  transactionId: string;
  paymentType: PaymentTypeEnum;
  paymentAmount: number;
  status: StatusEnum;
}

@Schema({ timestamps: true, versionKey: false })
export class Order extends Document {
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Product',
    required: true,
  })
  productIds: Product[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  orderBy: User;

  @Prop({ required: true, type: Object })
  orderPrice: OrderPrice;

  @Prop({ required: true })
  orderAddress: string[];

  @Prop({ required: true, default: OrderStatus.PENDING })
  orderStatus: string;

  @Prop({ required: true, type: Object })
  paymentDetails: PaymentDetails;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export const OrderTypes = Order && Document;
