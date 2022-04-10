import { Length, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;
    
    @IsEmail()
    readonly email: string;
    
    @Length(1, 255)
    password: string;
}