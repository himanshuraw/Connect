import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CommentDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 500)
    content: string;

    @IsOptional()
    parentCommentId?: number;
}