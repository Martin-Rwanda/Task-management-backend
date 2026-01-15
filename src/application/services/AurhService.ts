import { IUserRepository } from "../../domain";
import { comparePassword } from "../../shared/utils/password";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../shared/utils/jwt";
import { RefreshTokenModel } from "../../infrastructure/database/models/RefreshTokenModel";
import { AppError } from "../../shared";
import { RoleModel, UserModel } from "../../infrastructure";
import { Op } from 'sequelize';
import { jwtConfig } from "../../config/jwt.config";
import { AccessTokenPayload } from "../dtos/AccessTokenPayload";
import { RefreshTokenPayload } from "../dtos/RefreshTokenPayload";


interface UserWithRoles extends UserModel {
    roles?: RoleModel[];
}
export class AuthService {
    constructor(
        private authRepo: IUserRepository,
    ) {}

    async login(email: string, password: string) {
        const user = await this.authRepo.findByEmail(email);
        if(!user) throw new AppError("Inalid credentials", 401);

        const valid = await comparePassword(password, user.password);
        if(!valid) throw new AppError("Invalid credentials", 401);

        const userInstance = await UserModel.findByPk(user.id, {
            include: [{ model: RoleModel, as: "roles" }] // fetch roles
        })as UserWithRoles;

        const roles = userInstance?.roles?.map(role => role.name) || []; 

        const accessPayload: AccessTokenPayload = {
        sub: user.id,
        roles,
        };
        const accessToken = generateAccessToken(accessPayload);

        const refreshPayload: RefreshTokenPayload = {
        userId: user.id,
        roles,
        tokenType: "refresh",
        };
        const refreshToken = generateRefreshToken(refreshPayload);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await RefreshTokenModel.create({
            userId: user.id,
            token: refreshToken,
            expiresAt
        });

        return { accessToken, refreshToken, user};

    }

    async logout(refreshToken: string) {
        const deletedCount = await RefreshTokenModel.destroy({
            where: {
            token: refreshToken,
            deletedAt: { [Op.is]: null },
            },
        });

        if (deletedCount === 0) {
            throw new AppError("Invalid refresh token", 400);
        }

        return { message: "Logged out successfully" };
    }
    
    async refreshToken(refreshToken: string) {
        // Step 1: Fetch the stored token safely
        const stored = await RefreshTokenModel.findOne({
            where: {
            token: refreshToken,
            deletedAt: null,
            expiresAt: { [Op.gt]: new Date() },
            },
        });

        if (!stored) {
            throw new AppError("Invalid or expired refresh token", 401);
        }

        // Step 2: Verify JWT safely
        let payload: RefreshTokenPayload;
        try {
            payload = verifyRefreshToken(refreshToken);
            if (payload.tokenType !== "refresh") throw new AppError("Invalid token type", 401);
        } catch (err) {
            // Soft-delete the token safely if verification fails
            await stored.update({ deletedAt: new Date() }).catch(() => null);
            throw new AppError("Invalid or expired refresh token", 401);
        }

        // Step 3: Soft-delete the old token
        await stored.update({ deletedAt: new Date() }).catch(() => null);

        // Step 4: Fetch the user
        const user = await UserModel.findByPk(payload.userId, {
            include: [{ model: RoleModel, as: "roles" }],
        }) as UserWithRoles | null;

        if (!user || !user.isActive) throw new AppError("User not found or inactive", 404);

        // Step 5: Generate new tokens
        const roles = (user.roles || []).map((r) => r.name);

        const newAccessToken = generateAccessToken({ sub: user.id, roles });
        const newRefreshToken = generateRefreshToken({ userId: user.id, roles, tokenType: "refresh" });

        // Step 6: Save the new refresh token safely
        await RefreshTokenModel.create({
            userId: user.id,
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        }).catch((err) => console.error("Refresh token save error:", err));

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}