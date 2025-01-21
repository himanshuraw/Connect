import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";

export class CommentController {
    static async getCommentsForPost(request: Request, response: Response) {
        const postId = parseInt(request.params.postId);

        if (isNaN(postId)) {
            response.status(400).json({ message: "Post Id should be a number" });
            return;
        }

        try {
            const comments = await CommentService.getCommentsForPost(postId);
            response.status(200).json(comments);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message });
        }
    }

    static async createCommentForPost(request: Request, response: Response) {
        const postId = parseInt(request.params.postId);

        if (isNaN(postId)) {
            response.status(400).json({ message: "Post Id should be a number" });
            return;
        }

        const userId = request.user?.userId;
        if (!userId) {
            response.status(401).json({ message: "Unauthorized user" });
            return;
        }

        const { content, parentCommentId } = request.body;

        if (!content || typeof content !== 'string' || content.trim().length === 0) {
            response.status(400).json({ message: "Comment content is required and must be a non-empty string." })
            return;
        }

        try {
            const comment = await CommentService.createCommentForPost(postId, userId, content, parentCommentId);
            response.status(201).json(comment);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message });
        }
    }
}