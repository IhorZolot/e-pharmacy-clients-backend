import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartItem, CartItemDocument } from './cart.schema';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartItem.name) private cartModel: Model<CartItemDocument>,
  ) {}
  async getUserCart(userId: string): Promise<CartItem[]> {
    return this.cartModel.find({ user: userId }).populate('Product').exec();
  }

  async updateItem(id: string, quantity: number): Promise<CartItem | null> {
    return this.cartModel
      .findByIdAndUpdate(id, { quantity }, { new: true })
      .exec();
  }
  async checkout(userId: string): Promise<void> {
    await this.cartModel.deleteMany({ user: userId });
  }
}
