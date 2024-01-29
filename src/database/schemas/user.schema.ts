import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: Role.User })
  role: Role;

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Product',
    default: [],
  })
  cart: [Product];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
