import { Request, response, Response } from "express";
import { FollowService } from "../services/follow.service";

export class FollowController {
    static async handleFollowAction(request: Request, response: Response) {
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

        try {
            const result = await FollowService.handleFollowAction(followerId, followingId)
            response.status(201).json(result);
        } catch (error) {
            console.log(error);
            response.status(400).json({ message: (error as Error).message });
        }
    }

    static async processFollowRequest(request: Request, response: Response) {
        const userId = request.user?.userId;
        const followRequestId = parseInt(request.params.requestId);
        const { action } = request.body;

        if (!userId || isNaN(followRequestId) || !["accept", "reject"].includes(action)) {
            response.status(400).json({ message: "Invalid request" });
            return;
        }

        try {
            const result = await FollowService.processFollowRequest(followRequestId, userId, action);
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ message: (error as Error).message });
        }
    }

    static async getPendingRequests(request: Request, response: Response) {
        const userId = request.user?.userId;

        if (!userId) {
            response.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            const pendingRequests = await FollowService.getPendingRequests(userId);
            response.status(200).json(pendingRequests);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message });
        }
    }

    static async getFollowers(request: Request, response: Response) {
        const userId = parseInt(request.params.userId);
        console.log(userId)

        if (isNaN(userId)) {
            response.status(400).json({ message: "Invalid user ID" });
            return;
        }

        try {
            const followers = await FollowService.getFollowers(userId);
            response.status(200).json({ followers });
        } catch (error) {
            response.status(500).json({ message: (error as Error).message })
        }
    }

    static async getFollowings(request: Request, response: Response) {
        const userId = parseInt(request.params.userId);
        console.log(request.params)

        if (isNaN(userId)) {
            response.status(400).json({ message: "Invalid user ID" });
            return;
        }

        try {
            const followings = await FollowService.getFollowing(userId);
            response.status(200).json({ followings });
        } catch (error) {
            response.status(500).json({ message: (error as Error).message })
        }
    }
}