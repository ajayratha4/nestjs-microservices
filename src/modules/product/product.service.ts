import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from 'src/database/schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProducts() {
    try {
      const product = await this.productModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          $addFields: {
            createdBy: {
              $arrayElemAt: ['$createdBy', 0],
            },
          },
        },
        {
          $project: {
            'createdBy.password': 0,
            'createdBy.role': 0,
            'createdBy.createdAt': 0,
            'createdBy.updatedAt': 0,
          },
        },
      ]);

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(productId: string) {
    try {
      const product = await this.productModel.findById(productId);

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product: CreateProductDto) {
    try {
      return await new this.productModel(product).save();
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productId: string, product: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel
        .findOneAndUpdate({ _id: productId }, product, { new: true })
        .exec();

      if (!updatedProduct) {
        throw new NotFoundException('Product not found');
      }

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId: string) {
    try {
      const deletedProduct = await this.productModel
        .findByIdAndDelete(productId)
        .exec();

      if (!deletedProduct) {
        throw new NotFoundException('Product not found');
      }

      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}
