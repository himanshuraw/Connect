import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Follow } from "./Follow";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column({ nullable: true })
    lastname: string;

    @Column({ type: "text", nullable: true })
    profilePictureUrl: string;

    @Column({ default: false })
    isPrivate: boolean;

    @Column({ type: "text", nullable: true })
    about: string;

    @OneToMany(() => Post, (post) => post.author, { cascade: true })
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.user, { cascade: true })
    likes: Like[];

    @OneToMany(() => Follow, (follow) => follow.follower)
    following: Follow[];

    @OneToMany(() => Follow, (follow) => follow.following)
    followers: Follow[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}