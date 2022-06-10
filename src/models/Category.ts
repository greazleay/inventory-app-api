import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';
import Product from './Product';

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

CategorySchema.pre('findByIdAndDelete', async function (done) {
  await Product.deleteMany({ category: this.getFilter()._id });
  done();
});

export default model<ICategory>('Category', CategorySchema);