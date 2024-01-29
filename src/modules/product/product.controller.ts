import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/database/schemas/user.schema';
import { RolesGuard } from 'src/guard/roles.guard';

@UseInterceptors(LoggingInterceptor)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string) {
    return await this.productService.getProduct(productId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const createdProduct = await this.productService.createProduct(body);

    return { message: 'Product created successfully', createdProduct };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() body: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      body,
    );

    return { message: 'Product updated successfully', updatedProduct };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    const deletedProduct = await this.productService.deleteProduct(productId);
    return { message: 'Product deleted successfully', deletedProduct };
  }
}
