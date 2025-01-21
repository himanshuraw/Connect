import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    // @MinLength(4, { message: 'Username is too short. It should be at least 4 characters long.' })
    username: string;

    @IsString()
    @MinLength(6, { message: 'Password is too short. It should be at least 6 characters long.' })
    password: string;
}
