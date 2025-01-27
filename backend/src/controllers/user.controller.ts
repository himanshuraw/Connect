import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { hashPassword } from "../utils/bcrypt";

export class UserController {
    static async getAllUsers(request: Request, response: Response) {
        try {
            const users = await UserService.getAllUsers();
            response.status(200).json(users);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message });
        }
    }

    static async getUserById(request: Request, response: Response) {
        const userId = parseInt(request.params.id);
        try {
            const user = await UserService.getUserById(userId);

            response.status(200).json(user);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message })
        }
    }

    static async getUserByUsername(request: Request, response: Response) {
        const username = request.params.username;
        try {
            const user = await UserService.getUserByUsername(username);
            response.status(200).json(user);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message });
        }
    }

    //* status code 201 : New resource successfully created
    static async createUser(request: Request, response: Response) {
        const userData = request.body;

        try {
            userData.password = await hashPassword(userData.password);

            const user = await UserService.createUser(userData);
            response.status(201).json(user);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message });
        }
    }

    static async updateUser(request: Request, response: Response) {
        const userId = parseInt(request.params.id);
        const updates = request.body;

        try {
            if (updates.password) {
                updates.password = await hashPassword(updates.password);
            }

            const updatedUser = await UserService.updateUser(userId, updates);

            if (!updatedUser) {
                response.status(404).json({ message: "User not found" });
                return;
            }

            response.status(200).json(updatedUser);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message });
        }
    }

    //* status code 201 : when there is no content to send back (FOR DELETING)
    static async deleteUser(request: Request, response: Response) {
        const userId = parseInt(request.params.id);
        try {
            const result = await UserService.deleteUser(userId);

            if (!result) {
                response.status(404).json({ message: "User not found" });
                return;
            }

            response.status(204).send();
        } catch (error) {
            response.status(500).json({ message: (error as Error).message });
        }
    }

    static async addProfilePicture(request: Request, response: Response) {
        const userId = request.user?.userId;
        const { profilePictureUrl } = request.body;

        if (!profilePictureUrl) {
            response.status(400).json({ message: " Profile picture URL is required" });
            return;
        }

        if (!userId) {
            response.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            const updatedUser = await UserService.updateUser(userId, { profilePictureUrl });

            if (!updatedUser) {
                response.status(404).json({ message: "User not found" });
                return;
            }

            response.status(200).json({ message: "Profile picture updated succesfully" });
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }
    }

    static async togglePrivacy(request: Request, response: Response) {
        const userId = request.user?.userId;

        if (!userId) {
            response.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            const user = await UserService.getUserById(userId);

            if (!user) {
                response.status(404).json({ message: "User not found" });
                return;
            }

            const updatedUser = await UserService.updateUser(userId, { isPrivate: !user.isPrivate });

            response.status(200).json({ message: `Privacy updated to ${updatedUser.isPrivate ? "private" : "public"}` })
        } catch (error) {
            response.status(400).json({ message: (error as Error).message });
        }
    }
}