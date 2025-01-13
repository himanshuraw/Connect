import { Request, Response } from "express";
import { PostData } from "../types/PostData";
import { PostService } from "../services/post.service";

export class PostController {
    static async createPost(request: Request, response: Response) {
        const userId = request.user?.userId;
        const { imageUrl, caption, tags } = request.body;

        if (!userId || !imageUrl) {
            response.status(400).json({ message: "User must be authenticated and image URL are required" })
            return;
        }

        try {
            const postData: PostData = { authorId: userId, imageUrl, caption, tags };
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

        try {
            const posts = await PostService.getAllPostByUser(userId);

            if (!posts || posts.length === 0) {
                response.status(404).json({ message: "No posts found for the user" });
                return;
            }

            response.status(200).json(posts);
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