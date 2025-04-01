import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { LoginDto } from './login.dto';
import { UserDto } from './user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/register')
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/all-users')
  async getAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ token: string; user: any }> {
    return this.usersService.login(loginDto);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, type: User })
  @Get('/logout')
  async logout(@Query('id') id: string): Promise<User | null> {
    return this.usersService.logout(id);
  }
  @ApiOperation({ summary: 'Get user info' })
  @ApiResponse({ status: 200, type: User })
  @Get('/user-info')
  async findOne(@Query('id') id: string): Promise<User | null> {
    return this.usersService.userInfo(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
