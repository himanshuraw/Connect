import { Request, Response } from "express";
import { Message } from "../utils/messages";
import { UserService } from "../services/user.service";
import { FeedService } from "../services/feed.service";

export class FeedController {
    static async getFeedForUser(request: Request, response: Response) {
        const userId = request.user?.userId;

        if (!userId) {
            response.status(401).json(Message.unauthorized);
            return;
        }

        try {
            const user = UserService.getUserById(userId);

            if (!user) {
                response.status(404).json(Message.dataNotFound('User'));
                return;
            }

            const posts = await FeedService.getFeedForUser(userId);
            response.status(200).json(posts)
        } catch (error) {
            response.status(500).json(Message.sendError(error))
        }


    }
}