import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface JwtPayload {
    userId: number;
    username: string;
}

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({ message: "Unauthorized: Token not provided" })
    }

    try {
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as JwtPayload;

        request.user = decoded;

        next();
    } catch (error) {
        return response.status(403).json({ message: "Forbidden: Invalid or expired token" })
    }
}