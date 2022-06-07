import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model<ICategory>('Category', CategorySchema);