import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Category } from './entities/category.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), ProductModule],
  // imports: [TypeOrmModule.forFeature([Category]), ProductModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
