import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Price } from 'src/database/schemas/product.schema';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsObject()
  price: Price;

  @IsNotEmpty()
  @IsArray()
  images: string[];

  @IsNumber()
  stockQuantity: number;

  @IsNotEmpty()
  @IsBoolean()
  isFeatured: boolean;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsObject()
  @IsOptional()
  price: Price;

  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  images: string[];

  @IsNumber()
  @IsOptional()
  stockQuantity: number;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;
}
