import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
    post: Post;

    @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}