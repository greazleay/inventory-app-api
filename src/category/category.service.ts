import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoryModel.create(createCategoryDto);
    return createdCategory.id;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  };

  async remove(id: string) {
    const deletedCategory = await this.categoryModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCategory.id;
  }
}
