import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";
import { IsNotEmpty, Length } from "class-validator";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 500)
    @IsNotEmpty()
    content: string;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
    post: Post;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
    author: User;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true, onDelete: "CASCADE" })
    parent: Comment;

    @OneToMany(() => Comment, (comment) => comment.parent, { cascade: true })
    replies: Comment[];


}