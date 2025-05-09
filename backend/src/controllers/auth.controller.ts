import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/bcrypt";
import { plainToInstance } from "class-transformer";
import { LoginDto } from "../dto/LoginDto";
import { validate } from "class-validator";
import { RegisterDto } from "../dto/RegisterDto";

export class AuthController {
    static async login(request: Request, response: Response) {
        const { email, username, password } = request.body;

        const loginDto = plainToInstance(LoginDto, request.body);
        const errors = await validate(loginDto);

        if (errors.length > 0) {
            response.status(400).json({ message: "Validation failed", errors });
            return;
        }

        try {
            let user = null;

            if (email) {
                user = await UserService.findUserByEmail(email);
            } else if (username) {
                user = await UserService.findUserByUsername(username);
            }

            if (!user) {
                response.status(404).json({ message: "User not found" });
                return
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                response.status(401).json({ message: "Invalid password" });
                return
            }

            const secret = process.env.JWT_SECRET as string;
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                secret,
                { expiresIn: "1d" }
            )

            response.status(200).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                }
            })
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
            return;
        }
    }

    /* Status code:
        400 : Bad request
        401 : Missing valid authentication credentials
    */
    static async register(request: Request, response: Response) {
        const registerDto = plainToInstance(RegisterDto, request.body);
        const errors = await validate(registerDto);

        if (errors.length > 0) {
            response.status(400).json({ message: "Validation failed", errors });
            return;
        }
        const { email, username, password, firstname, lastname } = registerDto;

        try {
            const existingEmail = await UserService.findUserByEmail(email);
            if (existingEmail) {
                response.status(400).json({ message: "Email already exists" });
                return
            }

            const existingUsername = await UserService.findUserByUsername(username);
            if (existingUsername) {
                response.status(400).json({ message: "Username already exists" });
                return
            }

            const hashedPassword = await hashPassword(password);

            const user = await UserService.createUser({ email, username, password: hashedPassword, firstname, lastname });

            response.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user.id,
                    email: user.email,
                    username: username,
                }
            });
        } catch (error) {
            response.status(500).json({ message: "Internal server error" });
        }
    }
}