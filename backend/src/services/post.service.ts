import { AppDataSource } from "../config/db";
import { PostDto } from "../dto/PostDto";
import { Post } from "../models/postgresql/Post";
import { User } from "../models/postgresql/User";

export class PostService {
    private static postRepository = AppDataSource.getRepository(Post);
    private static userRepository = AppDataSource.getRepository(User);

    static async getAllPost() {
        return this.postRepository.find({
            relations: ["author", "comments", "likes"],
            order: { createdAt: "DESC" },
        });
    }

    static async getPostById(id: number) {
        return this.postRepository.findOne({
            where: { id },
            relations: ["author"]
        });
    }

    static async getAllPostByUser(id: number, page: number, limit: number) {

        const [posts, total] = await this.postRepository.findAndCount({
            where: { author: { id } },
            relations: ["author", "comments", "likes"],
            order: { createdAt: "DESC" },
            skip: (page - 1) * limit,
            take: limit
        });

        const formattedPosts = posts.map(({ author, ...postDetails }) => ({
            ...postDetails,
            author: {
                id: author.id,
                email: author.email,
                username: author.username,
                profilePictureUrl: author.profilePictureUrl,
            },
        }));

        return { posts: formattedPosts, total }

    }

    static async getPostsByUsername(username: string, page: number, limit: number) {
        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);

        const user = await userRepository.findOne({ where: { username } });

        if (!user) {
            throw new Error("User not found");
        }

        const [posts, total] = await postRepository.findAndCount({
            where: { author: { id: user.id } },
            relations: ["author", "comments", "likes"],
            order: { createdAt: "DESC" },
            skip: (page - 1) * limit,
            take: limit,
        });

        const formattedPosts = posts.map(({ author, ...postDetails }) => ({
            ...postDetails,
            author: {
                id: author.id,
                email: author.email,
                username: author.username,
                profilePictureUrl: author.profilePictureUrl,
            },
        }));

        return { posts: formattedPosts, total }
    }

    static async createPost(data: PostDto) {
        const { authorId, imageUrl, caption, tags } = data;

        const author = await this.userRepository.findOne({
            where: { id: authorId }
        });

        if (!author) {
            throw new Error(`Author with ID ${authorId} not found`);
        }

        const newPost = this.postRepository.create({
            author,
            imageUrl,
            caption,
            tags,
        })

        return await this.postRepository.save(newPost);
    }

    static async deletePostById(id: number) {
        const result = await this.postRepository.delete(id);
        return result.affected! > 0;
    }
}