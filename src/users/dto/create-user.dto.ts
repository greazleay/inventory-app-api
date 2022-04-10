import { Length, isAlphanumeric, IsEmail, IsNotEmpty, IsAlphanumeric } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;
    
    @IsEmail()
    readonly email: string;
    
    @IsAlphanumeric()
    @Length(6, 255)
    readonly password: string;
}