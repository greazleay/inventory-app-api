import { Document } from 'mongoose';
import { ICategory } from './category.interface';

export interface IProduct extends Document {
    name: string;
    description: string;
    categories: ICategory[];
    price: number;
    stock: number;
    img: string;
}