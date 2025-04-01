import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PharmacyDocument = Pharmacy & Document;

@Schema({ timestamps: true })
export class Pharmacy {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  rating: string;
}
export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);
