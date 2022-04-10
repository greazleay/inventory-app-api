import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), forwardRef(() => CategoryModule)],
  exports: [TypeOrmModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
