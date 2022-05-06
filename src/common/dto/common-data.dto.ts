import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginateDto {
    @IsInt()
    @Type(() => Number)
    @Min(1, { message: 'page must be greater than 1' })
    readonly page: number;

    @IsInt()
    @Type(() => Number)
    readonly take: number
}