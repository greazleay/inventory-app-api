import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Product, ProductDocument } from './schemas/product.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(
    // @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    @InjectRepository(Product) private readonly productRepository: MongoRepository<Product>,
    ) { }

  async create(createProductDto: CreateProductDto) {
    // const createdProduct = await this.productModel.create(createProductDto);
    const createdProduct = await this.productRepository.save(createProductDto);
    return createdProduct.id;
  }

  async findAll(): Promise<Product[]> {
    // return this.productModel.find().exec();
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    // return this.productModel.findOne({ _id: id }).populate('categories').exec();
    return this.productRepository.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    // const deletedProduct = await this.productModel
    //   .findByIdAndRemove({ _id: id })
    //   .exec();
    const deletedProduct = await this.productRepository.deleteOne({ _id: id });
    return deletedProduct;
  }
}
