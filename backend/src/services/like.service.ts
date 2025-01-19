import { AppDataSource } from "../config/db"
import { Like } from "../models/postgresql/Like";
import { Post } from "../models/postgresql/Post";
import { User } from "../models/postgresql/User"

export class LikeService {

    private static userRepository = AppDataSource.getRepository(User);
    private static postRepository = AppDataSource.getRepository(Post);
    private static likeRepository = AppDataSource.getRepository(Like);

    static async toggleLikePost(userId: number, postId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const post = await this.postRepository.findOneBy({ id: postId });

        if (!user) {
            throw new Error("User not found");
        }

        if (!post) {
            throw new Error("Post not available");
        }

        const existingLike = await this.likeRepository.findOne({
            where: { user: { id: userId }, post: { id: postId } },
        })

        if (existingLike) {
            await this.likeRepository.delete(existingLike.id);
            return { message: "Post unliked" };
        }

        const newLike = await this.likeRepository.create({ user, post });
        await this.likeRepository.save(newLike);
        return { message: "Post liked" };
    }

    static async getLikesForPost(postId: number) {
        const post = await this.postRepository.findOneBy({ id: postId });

        if (!post) {
            throw new Error("Post not found");
        }

        const likes = await this.likeRepository.find({
            where: { post: { id: postId } },
            relations: ["user"],
        });

        return likes.map(like => ({
            id: like.id,
            userId: like.user.id,
            username: like.user.username,
        }));
    }
}