import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { LoginDto } from './login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email, password }).exec();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
  async logout(id: string): Promise<User | null> {
    if (id.length !== 24) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userModel
      .findByIdAndUpdate(id, { isLoggedIn: false }, { new: true })
      .exec();
  }

  async userInfo(id: string): Promise<UserDocument | null> {
    if (id.length !== 24) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userModel.findById(id).exec();
  }
}
