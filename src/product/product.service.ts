import { BadRequestException, Injectable } from '@nestjs/common';
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
      if (doesProductExist) throw new BadRequestException('Product already exists');
      
      createProductDto.categories = await this.categoryRepository.findByIds(createProductDto.categories);
      const createdProduct = await this.productRepository.save(createProductDto);
      return createdProduct;

    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ["categories"] });
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const deletedProduct = await this.productRepository.delete(id);
    return deletedProduct;
  }
}
