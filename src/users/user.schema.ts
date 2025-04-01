import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @Prop({ required: true })
  username: string;
  @ApiProperty({ example: '123456', description: 'User password' })
  @Prop({ required: true })
  password: string;
  @ApiProperty({ example: 'johnd@example.com', description: 'User email' })
  @Prop({ required: true, unique: true })
  email: string;
  @ApiProperty({ example: '12345678', description: 'User phone' })
  @Prop({ required: true })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
