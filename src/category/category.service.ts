import { Injectable } from '@nestjs/common';

// Mongoose Option
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { Category, CategoryDocument } from './schemas/category.schema';

//TypeORM Option

// import { InjectRepository } from '@nestjs/typeorm';
// import { MongoRepository } from 'typeorm';
// import { Category } from './entities/category.entity';
// import { Product } from 'src/product/entities/product.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    // @InjectRepository(Category) private readonly categoryRepository: MongoRepository<Category>,
    // @InjectRepository(Product) private readonly productRepository: MongoRepository<Product>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoryModel.create(createCategoryDto);
    // const createdCategory = await this.categoryRepository.save(createCategoryDto);
    return createdCategory.id;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
    // return this.categoryRepository.find({ relations: ['products'] });
  }

  async findOne(id: string): Promise<{category: Category, relatedProducts: Product[]}> {
    const category = await this.categoryModel.findOne({ _id: id }).exec();
    const relatedProducts = await this.productModel.find({ categories: id }).exec();
    // const category = await this.categoryRepository.findOne(id);
    // const relatedProducts = await this.productRepository.find(
    //   where: { categories: id },
    // );
    return { category, relatedProducts };
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  };

  async remove(id: string) {
    const deletedCategory = await this.categoryModel
      .findByIdAndRemove({ _id: id })
      .exec();
    // const deletedCategory = await this.categoryRepository.deleteOne({ _id: id });
    return deletedCategory;
  }
}
