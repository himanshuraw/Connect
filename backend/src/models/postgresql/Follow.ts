import { CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('follows')
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, (user) => user.followers, { onDelete: "CASCADE" })
    follower: User;

    @ManyToMany(() => User, (user) => user.following, { onDelete: "CASCADE" })
    following: User;

    @CreateDateColumn()
    createdAt: Date;
}