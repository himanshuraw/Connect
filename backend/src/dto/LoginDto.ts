import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsString()
    @MinLength(6, { message: 'Password is too short. It should be atleast 6 characters long' })
    password: string;
}