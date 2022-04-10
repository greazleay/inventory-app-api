import { Injectable, ConflictException, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        try {
            const foundUser = await this.usersRepository.findOne({ email });
            if (!foundUser) throw new NotFoundException(`User with email: ${email} does not exist`);
            return foundUser;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    };

    async create(createUserDto: CreateUserDto): Promise<any> {
        try {
            const isUserExist = await this.usersRepository.findOne({ email: createUserDto.email })
            if (isUserExist) throw new ConflictException('Email Already Exist');
            const createdUser = this.usersRepository.create(createUserDto);
            await this.usersRepository.save(createdUser);
            // const { password, ...userWithoutPassword } = createdUser;
            return createdUser;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    };

    async delete(id: string) {

        try {
            await this.usersRepository.delete(id);
            return { statusCode: 200, message: 'User deleted' };
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}