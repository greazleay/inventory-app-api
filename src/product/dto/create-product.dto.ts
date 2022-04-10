import { Length, IsString, IsArray, IsNumber, IsNotEmpty, Min, } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateProductDto {
    
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    
    @IsArray()
    categories: Category[];
    
    @IsNumber()
    @Min(1)
    readonly price: number;
    
    @IsNumber()
    @Min(1)
    readonly stock: number;
    
    @IsString()
    readonly img: string;
};
