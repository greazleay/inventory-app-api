import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        const foundUser = await this.usersRepository.findOne({ email });
        if (!foundUser) throw new NotFoundException(`User with email: ${email} does not exist`);
        return foundUser;
    }

    async create(createUserDto: CreateUserDto): Promise<any> {
        const isUserExist = await this.usersRepository.findOne({email: createUserDto.email})
        if (isUserExist) throw new BadRequestException('Email Already Exist');
        
        createUserDto.password = await hash(createUserDto.password, 10);
        const createdUser = this.usersRepository.create(createUserDto);
        const { password, ...userWithoutPassword } = createdUser;
        return userWithoutPassword;
    }
}