import { Length, IsEmail } from "class-validator";

export class CreateUserDto {
    
    @IsEmail()
    readonly email: string;
    
    @Length(1, 255)
    readonly password: string;
}