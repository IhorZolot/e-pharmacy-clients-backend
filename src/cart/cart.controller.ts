import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartItemDto } from './update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Request() req) {
    return this.cartService.getUserCart(req.user.id);
  }
  @Put('/update')
  async updateQuantity(
    @Param('id') id: string,
    @Body() body: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(id, body.quantity);
  }
  @Post('/checkout')
  @Post('checkout')
  async checkout(@Request() req) {
    await this.cartService.checkout(req.user.id);
    return { message: 'Checkout complete' };
  }
}
