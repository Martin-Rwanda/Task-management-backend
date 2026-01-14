import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../application/services/AurhService";

export class AuthController {
    constructor(private authService: AuthService) {}

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

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.body;
            const token = await this.authService.refresh(refreshToken);
            res.json(token);
        } catch (err) {
            next(err);
        }
    };
}
