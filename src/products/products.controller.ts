import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  async findAllProducts(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  async findProductById(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findProductById(id);
  }
}
