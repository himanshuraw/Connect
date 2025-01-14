import { Request, response, Response } from "express";
import { FollowService } from "../services/follow.service";

export class FollowController {
    static async handleFollowAction(request: Request, response: Response) {
        try {
            const followerId = request.user?.userId;
            const followingId = parseInt(request.params.id);

            if (!followerId || isNaN(followingId)) {
                response.status(400).json({ message: "Invalid user ID" });
                return;
            }

            if (followerId === followingId) {
                response.status(400).json({ message: "You cannot follow or unfollow yourself" })
                return;
            }

            const result = await FollowService.handleFollowAction(followerId, followingId)
            response.status(201).json(result);
        } catch (error) {
            console.log(error);
            response.status(400).json({ message: (error as Error).message });
        }
    }

    static async processFollowRequest(request: Request, response: Response) {
        try {
            const userId = request.user?.userId;
            const followRequestId = parseInt(request.params.requestId);
            const { action } = request.body;

            if (!userId || isNaN(followRequestId) || !["accept", "reject"].includes(action)) {
                response.status(400).json({ message: "Invalid request" });
                return;
            }

            const result = await FollowService.processFollowRequest(followRequestId, userId, action);
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ message: (error as Error).message });
        }
    }

    static async getPendingRequests(request: Request, response: Response) {
        try {
            const userId = request.user?.userId;

            if (!userId) {
                response.status(401).json({ message: "Unauthorized" });
                return;
            }

            const pendingRequests = await FollowService.getPendingRequests(userId);
            response.status(200).json(pendingRequests);
        } catch (error) {
            response.send(500).json({ message: (error as Error).message });
        }
    }
}