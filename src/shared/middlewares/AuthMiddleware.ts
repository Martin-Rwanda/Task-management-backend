import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { AppError } from "../errors";
import { AccessTokenPayload } from "../../application/dtos/AccessTokenPayload";

export const AuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        throw new AppError("Unauthorized", 401);
    }

    const token = header.split(" ")[1];

    try {
        const payload = verifyAccessToken(token) as AccessTokenPayload;
        req.user = payload;
        next();
    } catch {
        throw new AppError("Invalid or expired token", 401);
    }
};