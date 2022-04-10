import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      if (doesCategoryExist) throw new BadRequestException('Category already exists');

      const createdCategory = await this.categoryRepository.save(createCategoryDto);
      return createdCategory;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  async findOne(id: string): Promise<Category> {

    try {
      const category = await this.categoryRepository.findOne(id, { relations: ['products'] });
      if (!category) throw new NotFoundException('Category does not exist');
      return category;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  };

  async delete(id: string) {

    try {
      const deletedCategory = await this.categoryRepository.delete(id);
      return deletedCategory;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}