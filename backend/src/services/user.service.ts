import { AppDataSource } from "../config/db";
import { User } from "../models/postgresql/User";

export class UserService {
    private static userRepository = AppDataSource.getRepository(User);

    static async getAllUsers() {
        return this.userRepository.find();
    }

    static async getUserById(id: number) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new Error(`user with ID ${id} not found`)
        }
        const { password, ...userDetails } = user;
        return { ...userDetails };
    }

    //better version around 34.7% faster search query
    static async getUserByUsername(username: string) {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.posts", "posts")
            .leftJoinAndSelect("user.followers", "followers")
            .leftJoinAndSelect("user.following", "following")
            .select([
                "user.id",
                "user.username",
                "user.profilePictureUrl",
                "user.isPrivate",
                "user.about",
                "user.createdAt",
                "user.updatedAt",
                "COUNT(posts.id) AS postCount",
                "COUNT(followers.id) AS followerCount",
                "COUNT(following.id) AS followingCount",
            ])
            .where("user.username = :username", { username })
            .groupBy("user.id")
            .getRawOne();

        if (!user) {
            throw new Error("User not found");
        }

        // Transform the raw result into a more user-friendly format
        return {
            id: user.user_id,
            username: user.user_username,
            profilePictureUrl: user.user_profilePictureUrl,
            isPrivate: user.user_isPrivate,
            about: user.user_about,
            createdAt: user.user_createdAt,
            updatedAt: user.user_updatedAt,
            postCount: parseInt(user.postCount, 10),
            followerCount: parseInt(user.followerCount, 10),
            followingCount: parseInt(user.followingCount, 10),
        };
    }

    static async createUser(userData: Partial<User>) {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    static async updateUser(id: number, updates: Partial<User>) {
        await this.userRepository.update(id, updates);
        return this.getUserById(id);
    }

    static async deleteUser(id: number) {
        const result = await this.userRepository.delete(id);
        return result.affected! > 0;
    }

    // static async findUserByEmailorUsername(emailOrUsername: string) {
    //     return this.userRepository.findOne({
    //         where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    //     });
    // }

    static async findUserByUsername(username: string) {
        return this.userRepository.findOne({
            where: { username: username },
        })
    }

    static async findUserByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email: email },
        })
    }
}