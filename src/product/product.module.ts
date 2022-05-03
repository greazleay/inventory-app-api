import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), forwardRef(() => CategoryModule), DefaultAdminModule],
  exports: [TypeOrmModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { 
  constructor(private readonly adminSite: DefaultAdminSite) {
    this.adminSite.register('Product', Product);
  }
}
