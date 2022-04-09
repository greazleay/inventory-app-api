import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = await this.userModel.create(createUserDto);
        return createdUser;
    }
}