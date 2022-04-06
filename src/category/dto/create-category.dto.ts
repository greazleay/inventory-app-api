import { Length } from "class-validator";

export class CreateCategoryDto {
    
    @Length(1, 100)
    readonly name: string;
    
    @Length(1, 255)
    readonly description: string;
}
