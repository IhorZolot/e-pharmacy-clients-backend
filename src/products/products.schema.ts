import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @Prop()
  photo: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  suppliers: string;

  @Prop()
  stock: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
