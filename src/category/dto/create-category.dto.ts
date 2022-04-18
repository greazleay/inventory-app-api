import { Length, IsString, } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {

    @ApiProperty()
    @IsString()
    @Length(1, 100)
    readonly name: string;

    @ApiProperty()
    @IsString()
    @Length(1, 255)
    readonly description: string;
}