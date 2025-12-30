import { Request, Response } from "express";
import { RefreshTokenService } from "../../application/services/RefreshTokenService";

export class RefreshController {
    constructor(private refreshService: RefreshTokenService) {}

    refreshToken = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        const newToken = await this.refreshService.execute(refreshToken);
        res.status(200).json(newToken);
    };
}