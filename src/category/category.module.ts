import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => ProductModule), DefaultAdminModule],
  exports: [TypeOrmModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { 
  constructor(private readonly adminSite: DefaultAdminSite) {
    this.adminSite.register('Category', Category);
  }
}
