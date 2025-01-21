import { IsArray, IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class PostDto {
    @IsInt()
    authorId: number;

    @IsUrl()
    imageUrl: string;

    @IsOptional()
    @IsString()
    caption?: string;

    @IsOptional()
    @IsArray()
    tags?: string[];
}