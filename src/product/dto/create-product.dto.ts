import { Category } from "src/category/schemas/category.schema";

export class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly category: Category[];
    readonly price: number;
    readonly stock: number;
    readonly img: string;
    readonly imageUrl: string;
};
