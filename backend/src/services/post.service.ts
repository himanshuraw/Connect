import { error } from "console";
import { AppDataSource } from "../config/db";
import { Post } from "../models/postgresql/Post";
import { User } from "../models/postgresql/User";
import { PostData } from "../types/PostData";

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

    static async getAllPostByUser(id: number) {
        const posts = await this.postRepository.find({
            where: { author: { id } },
            relations: ["author", "comments", "likes"],
            order: { createdAt: "DESC" },
        });

        return posts.map(post => {
            const { author, ...postDetails } = post;
            const { password, createdAt, updatedAt, ...authorDetails } = author;
            return {
                ...postDetails,
                author: authorDetails
            }
        })
    }

    static async createPost(data: PostData) {
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