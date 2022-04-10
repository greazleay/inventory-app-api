import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => ProductModule)],
  exports: [TypeOrmModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
