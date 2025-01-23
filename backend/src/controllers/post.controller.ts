import { Request, Response } from "express";
import { PostService } from "../services/post.service";
import { plainToInstance } from "class-transformer";
import { PaginationDto } from "../dto/PaginationDto";
import { validate } from "class-validator";
import { PostDto } from "../dto/PostDto";

export class PostController {
    static async createPost(request: Request, response: Response) {
        const userId = request.user?.userId;
        const { imageUrl, caption, tags } = request.body;

        if (!userId || !imageUrl) {
            response.status(400).json({ message: "User must be authenticated and image URL are required" })
            return;
        }

        const postData = plainToInstance(PostDto, { authorId: userId, imageUrl, caption, tags })
        const errors = await validate(postData);

        if (errors.length > 0) {
            response.status(400).json({ message: 'Validation failed', errors });
            return;
        }

        try {
            const newPost = await PostService.createPost(postData);
            response.status(201).json(newPost);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes("Author with ID")) {
                    response.status(404).json({ message: error.message });
                    return
                }
            }
            response.status(500).json({ message: "Internal server error" })
        }
    }

    static async getAllPostByUser(request: Request, response: Response) {
        const userId = parseInt(request.params.userId);

        if (isNaN(userId)) {
            response.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const query = plainToInstance(PaginationDto, request.query);
        const errors = await validate(query);

        if (errors.length > 0) {
            response.status(400).json({ message: 'Validation failed', errors });
            return;
        }

        const page = query.page || 1;
        const limit = query.limit || 12;

        try {
            const { posts, total } = await PostService.getAllPostByUser(userId, page, limit);

            if (!posts || posts.length === 0) {
                response.status(404).json({ message: "No posts found for the user" });
                return;
            }

            response.status(200).json({
                posts,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            });
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }
    }


    static async deletePost(request: Request, response: Response) {
        const postId = parseInt(request.params.id);

        if (isNaN(postId)) {
            response.status(400).json({ message: "Invalid post ID" });
        }

        try {
            const userId = request.user?.userId;
            if (!userId) {
                response.status(401).json({ message: "Unauthorized" });
                return;
            }

            const post = await PostService.getPostById(postId);

            if (!post) {
                response.status(404).json({ message: "Post not found" });
                return;
            }

            if (post.author.id !== userId) {
                response.status(403).json({ message: "Forbidden: You don't have permission to delete this post" });
                return;
            }

            const isDeleted = await PostService.deletePostById(postId);
            if (!isDeleted) {
                response.status(404).json({ message: "Post not found" });
                return;
            }

            response.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Internal server error" });
        }
    }
}