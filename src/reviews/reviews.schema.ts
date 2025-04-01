import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReviewsDocument = Reviews & Document;

@Schema()
export class Reviews {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  testimonial: string;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);
