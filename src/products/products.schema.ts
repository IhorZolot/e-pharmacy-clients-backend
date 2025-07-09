import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'URL of product photo',
    required: false,
    type: String,
  })
  @Prop()
  photo: string;

  @ApiProperty({ example: 'Aspirin', description: 'Product name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'Bayer', description: 'Suppliers' })
  @Prop()
  suppliers: string;

  @ApiProperty({
    example: 10,
    description: 'Number of items in stock',
    required: false,
    type: Number,
  })
  @Prop()
  stock: string;

  @ApiProperty({
    example: 12.45,
    description: 'Price in USD',
    required: true,
    type: Number,
  })
  @Prop({ required: true })
  price: number;

  @ApiProperty({
    example: 'Health',
    description: 'Product category',
    required: true,
    type: String,
  })
  @Prop({ required: true })
  category: string;

  @ApiProperty({
    example: 'This is a product',
    description: 'Product description',
    required: false,
    type: String,
  })
  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
