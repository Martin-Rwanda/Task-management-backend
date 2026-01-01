import { verifyRefreshToken, generateAccessToken } from "../../shared/utils/jwt";
import { RefreshTokenModel } from "../../infrastructure/database/models/RefreshTokenModel";
import { AppError } from "../../shared";
import { RoleModel, UserModel } from "../../infrastructure";

interface UserWithRoles extends UserModel {
    roles?: RoleModel[];
}
export class RefreshTokenService {
    async execute(refreshToken: string) {
        const stored = await RefreshTokenModel.findOne({
            where: { token: refreshToken },
        });

        if (!stored) {
            throw new AppError("Invalid refresh token", 403);
        }

        const payload = verifyRefreshToken(refreshToken);

        const userInstance = await UserModel.findByPk(payload.userId, {
            include: [{ model: RoleModel, as: "roles" }],
        }) as UserWithRoles;

        if (!userInstance) {
            throw new AppError("User not found", 404);
        }

        const roles = userInstance.roles?.map(role => role.name) || [];

        const newAccessToken = generateAccessToken({
            sub: userInstance.id, 
            roles,               
        });

        return { accessToken: newAccessToken };
    }
}