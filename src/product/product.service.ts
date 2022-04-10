import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {

      const doesProductExist = await this.productRepository.findOne({ name: createProductDto.name });
      if (doesProductExist) throw new ConflictException('Product already exists');

      createProductDto.categories = await this.categoryRepository.findByIds(createProductDto.categories);
      const createdProduct = await this.productRepository.save(createProductDto);
      return createdProduct;

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    try {
      return this.productRepository.findOne(id, { relations: ["categories"] });
    } catch (error) {
      throw new HttpException(error.messsage, error.status);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {

    try {
      await this.productRepository.delete(id);
      return { statusCode: 200, message: 'Product deleted' };
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
