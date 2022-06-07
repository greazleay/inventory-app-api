import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';


const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: { type: Number },
  stock: { type: Number },
  img: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model<IProduct>('Product', ProductSchema);
