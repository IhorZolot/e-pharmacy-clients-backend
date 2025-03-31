import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { LoginDto } from './login.dto';
import { UserDto } from './user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/register')
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Get('/all-users')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<User> {
    return this.usersService.login(loginDto);
  }
  @Get('/logout')
  async logout(@Query('id') id: string): Promise<User | null> {
    return this.usersService.logout(id);
  }

  @Get('/user-info')
  async findOne(@Query('id') id: string): Promise<User | null> {
    return this.usersService.userInfo(id);
  }
}
