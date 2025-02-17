import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { plainToInstance } from "class-transformer";
import { CommentDto } from "../dto/CommentDto";
import { validate } from "class-validator";
import { Message } from "../utils/messages";

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
            response.status(500).json(Message.sendError(error));
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
            response.status(401).json(Message.unauthorized);
            return;
        }

        const commentDto = plainToInstance(CommentDto, request.body);
        const errors = await validate(commentDto);

        if (errors.length > 0) {
            response.status(400).json({ message: "Validation Failed", errors });
            return;
        }

        try {
            const comment = await CommentService.createCommentForPost(postId, userId, commentDto);
            response.status(201).json(comment);
        } catch (error) {
            response.status(500).json(Message.sendError(error));
        }
    }

    static async deleteComment(request: Request, response: Response) {
        const commentId = parseInt(request.params.commentId);

        if (isNaN(commentId)) {
            response.status(400).json({ message: `Comment Id should be a number` });
            return;
        }

        const userId = request.user?.userId;
        if (!userId) {
            response.status(401).json(Message.unauthorized);
            return;
        }

        try {
            const isDeleted = await CommentService.deleteComment(commentId, userId);

            if (isDeleted) response.status(204).send();
            else response.status(404).json({ message: `Comment ${commentId} not found or couldn't be deleted` })
        } catch (error) {
            const errorMessage = (error as Error).message;

            switch (true) {
                case errorMessage.includes("not authorized"):
                    response.status(403).json({ message: errorMessage });
                    break;
                case errorMessage.includes("not found"):
                    response.status(404).json({ message: errorMessage });
                    break;
                default:
                    response.status(500).json({ message: "Internal server error" })
            }
        }
    }
}