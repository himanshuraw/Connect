import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JwtPayload } from "../types/jwt";

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        response.status(401).json({ message: "Unauthorized: Token not provided or invalid format" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as JwtPayload;

        request.user = decoded;

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        response.status(403).json({ message: "Forbidden: Invalid or expired token" });
        return;
    }
};