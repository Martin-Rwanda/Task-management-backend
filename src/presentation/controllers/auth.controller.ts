import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../application/services/AurhService";
import { AppError } from "../../shared";

export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const tokens = await this.authService.login(email, password);
            res.json(tokens);
        } catch (err) {
            next(err);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken || typeof refreshToken !== "string") {
                return res.status(400).json({ message: "Refresh token required" });
            }

            const result = await this.authService.logout(refreshToken);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.body;
            const newToken = await this.authService.refreshToken(refreshToken);
            res.status(200).json(newToken);
        } catch (err) {
            if (err instanceof AppError) {
            res.status(err.statusCode).json({ message: err.message });
            } else {
            next(err); // fallback
            }
        }
    };
}
