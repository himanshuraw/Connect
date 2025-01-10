import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from "bcrypt";

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

            const salt = parseInt(process.env.SALT || "10", 10);
            userData.password = await bcrypt.hash(userData.password, salt);

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

                const salt = parseInt(process.env.SALT || "10", 10);
                updates.password = await bcrypt.hash(updates.password, salt);
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
}