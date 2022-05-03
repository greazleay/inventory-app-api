import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DefaultAdminModule],
  exports: [UsersService, TypeOrmModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { 
  constructor(private readonly adminSite: DefaultAdminSite) {
    this.adminSite.register('User', User);
  }
}
