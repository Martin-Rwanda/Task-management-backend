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
}
