import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from "bcrypt";
import { isBase64 } from "../utils/base64";
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
        try {
            const userId = parseInt(request.params.id);
            const user = await UserService.getUserById(userId);

            if (!user) {
                response.status(404).json({ message: `User not found` });
                return;
            }

            response.status(200).json(user);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message })
        }
    }

    //* status code 201 : New resource successfully created
    static async createUser(request: Request, response: Response) {
        try {
            const userData = request.body;

            userData.password = await hashPassword(userData.password);

            const user = await UserService.createUser(userData);
            response.status(201).json(user);
        } catch (error) {
            response.status(500).json({ message: (error as Error).message });
        }
    }

    static async updateUser(request: Request, response: Response) {
        try {
            const userId = parseInt(request.params.id);
            const updates = request.body;

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
        try {
            const userId = parseInt(request.params.id);
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
        try {
            const userId = parseInt(request.params.id);
            const { profilePictureUrl } = request.body;

            if (!profilePictureUrl) {
                response.status(400).json({ message: " Profile picture URL is required" });
                return;
            }

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
}