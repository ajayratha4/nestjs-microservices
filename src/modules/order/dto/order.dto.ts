import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  OrderPrice,
  OrderStatus,
  PaymentTypeEnum,
  StatusEnum,
} from 'src/database/schemas/order.schema';

class PaymentDetailsDto {
  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @IsNotEmpty()
  @IsEnum(PaymentTypeEnum)
  paymentType: PaymentTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  paymentAmount: number;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  productIds: string[];

  @IsNotEmpty()
  @IsMongoId()
  orderBy: string;

  @IsNotEmpty()
  @IsObject()
  orderPrice: OrderPrice;

  @IsNotEmpty()
  @IsArray()
  orderAddress: string[];

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  paymentDetails: PaymentDetailsDto;
}
