import { Injectable, BadRequestException, ConflictException, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {

    try {
      const doesCategoryExist = await this.categoryRepository.findOne({ name: createCategoryDto.name });
      if (doesCategoryExist) throw new ConflictException('Category already exists');

      const createdCategory = await this.categoryRepository.save(createCategoryDto);
      return createdCategory;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return this.categoryRepository.find();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<Category> {

    try {
      const category = await this.categoryRepository.findOne(id, { relations: ['products'] });
      if (!category) throw new NotFoundException('Category does not exist');
      return category;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  };

  async delete(id: string) {

    try {
      await this.categoryRepository.delete(id);
      return { statusCode: 200, message: 'Category deleted' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}