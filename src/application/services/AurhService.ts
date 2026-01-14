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
    
    // async refresh(refreshToken: string) {
    //     const storedToken = await RefreshTokenModel.findOne({
    //         where: { token: refreshToken }
    //     });

    //     if (!storedToken) {
    //         throw new AppError("Invalid refresh token", 401);
    //     }

    //     const payload = verifyRefreshToken(refreshToken);

    //     const newAccessToken = generateAccessToken({
    //         sub: payload.userId,
    //         roles: payload.roles,
    //     });

    //     return { accessToken: newAccessToken };
    // }

    async refresh(refreshToken: string) {
        const storedToken = await RefreshTokenModel.findOne({
            where: {
            token: refreshToken,
            deletedAt: { [Op.is]: null },
            },
        });

        if (!storedToken || storedToken.expiresAt < new Date()) {
            throw new AppError('Invalid or expired refresh token', 401);
        }

        const payload = verifyRefreshToken(refreshToken);

        // 🔒 revoke old token (atomic)
        await RefreshTokenModel.destroy({
            where: {
            id: storedToken.id,
            deletedAt: { [Op.is]: null },
            },
        });

        const newAccessToken = generateAccessToken({
            sub: payload.userId,
            roles: payload.roles,
        });

        const newRefreshToken = generateRefreshToken({
            userId: payload.userId,
            roles: payload.roles,
            tokenType: "refresh",
        });

        await RefreshTokenModel.create({
            userId: payload.userId,
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + jwtConfig.refreshTokenTtl),
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
}