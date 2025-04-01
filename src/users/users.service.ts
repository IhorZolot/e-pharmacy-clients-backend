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
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async createUser(userDto: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const createdUser = new this.userModel({
      ...userDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }
  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: Partial<User> }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      token,
      user: userWithoutPassword,
    };
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
