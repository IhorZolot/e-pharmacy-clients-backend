import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAllProducts(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }
  @Get(':id')
  async findProductById(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findProductById(id);
  }
}
