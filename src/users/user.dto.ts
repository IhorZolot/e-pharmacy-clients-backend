import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: 'johnd@example.com', description: 'User email' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '12345678', description: 'User phone' })
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ example: '123456', description: 'User password' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
