import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './schemas/category.schema';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), ProductModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
