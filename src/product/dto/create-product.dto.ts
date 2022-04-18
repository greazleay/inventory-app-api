import { Length, IsString, IsArray, IsNumber, IsNotEmpty, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/entities/category.entity";

export class CreateProductDto {

    @ApiProperty({
        description: 'Name of the Product',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        description: 'A brief description of the Product'
    })
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty({
        description: 'An array of categories the product belongs to',
        type: () => Category
    })
    @IsArray()
    categories: Category[];

    @ApiProperty()    
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(1)
    readonly price: number;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    readonly stock: number;

    @ApiProperty()
    @IsString()
    readonly img: string;
};
