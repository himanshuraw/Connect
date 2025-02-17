import { Request, Response } from "express";
import { LikeService } from "../services/like.service";
import { Message } from "../utils/messages";

export class LikeController {
    static async toggleLikePost(request: Request, response: Response) {
        const userId = request.user?.userId;
        const postId = parseInt(request.params.postId);

        if (!userId || isNaN(postId)) {
            response.status(400).json({ message: "Invalid user ID or post ID" });
            return;
        }

        try {
            const result = await LikeService.toggleLikePost(userId, postId);
            response.status(200).json(result);
        } catch (error) {
            response.status(500).json(Message.sendError(error));
        }
    }

    static async getLikesForPost(request: Request, response: Response) {
        const postId = parseInt(request.params.postId);

        if (isNaN(postId)) {
            response.status(400).json({ message: "Invalid post ID" });
            return;
        }

        try {
            const likes = await LikeService.getLikesForPost(postId);
            response.status(200).json({ likes });
        } catch (error) {
            response.status(500).json(Message.sendError(error));
        }
    }
}