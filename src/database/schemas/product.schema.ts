import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export interface Price {
  original: number;
  sell: number;
}

@Schema({ timestamps: true, versionKey: false })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object, required: true })
  price: Price;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ default: 0 })
  stockQuantity: number;

  @Prop({ default: false })
  isFeatured: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductTypes = Product & Document;
