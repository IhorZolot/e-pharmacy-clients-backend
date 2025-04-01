import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async findProductById(id: string): Promise<ProductDocument | null> {
    if (id.length !== 24) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.productModel.findById(id).exec();
  }
}
