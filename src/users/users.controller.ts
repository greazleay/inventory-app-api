import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@SerializeOptions({
    strategy: 'excludeAll',
})
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get('userinfo')
    findOne(@Body('email') email: string) {
        return this.usersService.findOne(email);
    }

}
