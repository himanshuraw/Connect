import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Like } from "./Like";
import { Comment } from "./Comment";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    imageUrl: string;

    @Column({ type: 'text', nullable: true })
    caption: string;

    @Column('simple-array', { nullable: true })
    tags: string[];

    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
    author: User;

    @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.post, { cascade: true })
    likes: Like[];

    @CreateDateColumn()
    createdAt: Date;
}