import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Product, ProductSchema } from './schemas/product.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';


@Module({
  // imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  // exports: [MongooseModule],
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [TypeOrmModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
