import { AppDataSource } from "../config/db";
import { Follow } from "../models/postgresql/Follow";
import { User } from "../models/postgresql/User";

export class FollowService {
    private static followRepository = AppDataSource.getRepository(Follow);
    private static userRepository = AppDataSource.getRepository(User);

    static async handleFollowAction(followerId: number, followingId: number) {
        const follower = await this.userRepository.findOneBy({ id: followerId });
        const following = await this.userRepository.findOneBy({ id: followingId });

        if (!follower) throw new Error(`Follower with ID ${followerId} not found`);
        if (!following) throw new Error(`User with ID ${followingId} not found`);


        const existingFollow = await this.followRepository.findOne({
            where: {
                follower: { id: followerId },
                following: { id: followingId }
            }
        });

        if (existingFollow) {
            const message = existingFollow.isAccepted ? "Unfollowed" : " Follow request canceled";
            await this.followRepository.delete(existingFollow.id);
            return { message };
        }

        const followRequest = this.followRepository.create({
            follower,
            following,
            isAccepted: !follower.isPrivate,
        });

        await this.followRepository.save(followRequest);

        return {
            message: following.isPrivate
                ? "Follow request sent"
                : "Followed"
        }
    }

    static async processFollowRequest(followRequestId: number, userId: number, action: "accept" | "reject") {
        const followRequest = await this.followRepository.findOne({
            where: { id: followRequestId },
            relations: ["follower", "following"],
        });

        if (!followRequest) {
            throw new Error("Follow request not found ");
        }

        if (followRequest.following.id !== userId) {
            throw new Error("Unauthorized to process this follow request");
        }

        if (action === "accept") {
            followRequest.isAccepted = true;
            await this.followRepository.save(followRequest);
            return { message: "Follow request accepted" };
        }

        if (action === "reject") {
            await this.followRepository.delete(followRequestId);
            return { message: " Follow request rejected" };
        }

        throw new Error(`Invalid action: ${action}. Expected "accept" or "reject".`);

    }


    static async getPendingRequests(userId: number) {
        return this.followRepository.find({
            where: {
                following: { id: userId },
                isAccepted: false,
            },
            relations: ["follower"],
        });
    }

    static async getFollowers(userId: number) {
        return this.followRepository.find({
            where: {
                following: { id: userId },
                isAccepted: true,
            },
            relations: ["follower"],
        });
    }

    static async getFollowing(userId: number) {
        return this.followRepository.find({
            where: {
                follower: { id: userId },
                isAccepted: true,
            },
            relations: ["following"],
        });
    }
}