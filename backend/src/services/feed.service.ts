import { In } from "typeorm";
import { AppDataSource } from "../config/db";
import { Follow } from "../models/postgresql/Follow";
import { Post } from "../models/postgresql/Post";

export class FeedService {
    private static postRepository = AppDataSource.getRepository(Post);
    private static followRepository = AppDataSource.getRepository(Follow);

    static async getFeedForUser(userId: number) {
        const followings = await this.followRepository.find({
            where: { follower: { id: userId }, isAccepted: true },
            relations: ["following"],
        })

        const followingIds = followings.map(follow => follow.following.id)

        followingIds.push(userId);

        const posts = await this.postRepository.find({
            where: { author: { id: In(followingIds) } },
            relations: ["author", "likes", "comments"],
            order: { createdAt: 'DESC' },
        });

        return posts
    }
}