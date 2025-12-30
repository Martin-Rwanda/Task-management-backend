import { verifyRefreshToken, generateAccessToken } from "../../shared/utils/jwt";
import { RefreshTokenModel } from "../../infrastructure/database/models/RefreshTokenModel";
import { AppError } from "../../shared";
import { UserModel } from "../../infrastructure";

export class RefreshTokenService {
    async execute(refreshToken: string) {
        const stored = await RefreshTokenModel.findOne({
            where: { token: refreshToken },
        });

        if (!stored) {
            throw new AppError("Invalid refresh token", 403);
        }

        const payload = verifyRefreshToken(refreshToken);

        const user = await UserModel.findByPk(payload.userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const newAccessToken = generateAccessToken({
            sub: payload.userId,   
            role: user.id,    
        });

        return { accessToken: newAccessToken };
    }
}