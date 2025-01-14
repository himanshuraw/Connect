import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('follows')
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.following, { onDelete: "CASCADE" })
    @JoinColumn({ name: "followerId" })
    follower: User;

    @ManyToOne(() => User, (user) => user.followers, { onDelete: "CASCADE" })
    @JoinColumn({ name: "followingId" })
    following: User;

    @Column({ default: false })
    isAccepted: boolean;

    @CreateDateColumn()
    createdAt: Date;
}