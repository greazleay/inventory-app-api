import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }])
    categories: Category[];

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop({ required: true })
    img: string;

    @Prop({ required: true })
    imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);