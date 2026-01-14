import { NextFunction, Request, Response } from "express";
import { RefreshTokenService } from "../../application/services/RefreshTokenService";
import { AppError } from "../../shared";

export class RefreshController {
  constructor(private refreshService: RefreshTokenService) {}

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        const newToken = await this.refreshService.execute(refreshToken);
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