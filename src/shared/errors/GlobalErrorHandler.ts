import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

export const GlobalErrorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    console.error(err); // placeholder for proper logging
    res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
};