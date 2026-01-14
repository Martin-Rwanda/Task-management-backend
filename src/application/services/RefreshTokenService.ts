import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../../shared/utils/jwt";
import { RefreshTokenModel } from "../../infrastructure/database/models/RefreshTokenModel";
import { AppError, getRefreshTokenExpiryDate } from "../../shared";
import { RoleModel, UserModel } from "../../infrastructure";
import { RefreshTokenPayload } from "../dtos/RefreshTokenPayload";
import { Op } from "sequelize";
import { AccessTokenPayload } from "../dtos/AccessTokenPayload";


interface UserWithRoles extends UserModel {
  roles?: { name: string }[];
}

export class RefreshTokenService {
  async execute(refreshToken: string) {
    const stored = await RefreshTokenModel.findOne({
      where: {
        token: refreshToken,
        deletedAt: null,
        expiresAt: { [Op.gt]: new Date() },
      },
    });

    if (!stored) throw new AppError("Invalid or expired refresh token", 401);

    let payload: RefreshTokenPayload;
    try {
      payload = verifyRefreshToken(refreshToken);
      if (payload.tokenType !== "refresh") throw new AppError("Invalid token type", 401);
    } catch (err) {
      if (stored && !stored.deletedAt) {
        await stored.update({ deletedAt: new Date() }).catch(() => null);
      }
      throw new AppError("Invalid or expired refresh token", 401);
    }

    if (!stored.deletedAt) {
      await stored.update({ deletedAt: new Date() });
    }

    const user = await UserModel.findByPk(payload.userId, {
      include: [{ model: RoleModel, as: "roles" }],
    }) as UserWithRoles | null;

    if (!user || !user.isActive) throw new AppError("User not found or inactive", 404);

    const roles = (user.roles || []).map((r) => r.name);

    const accessPayload: AccessTokenPayload = {
      sub: user.id,
      roles,
    };
    const newAccessToken = generateAccessToken(accessPayload);

    const refreshPayload: RefreshTokenPayload = {
      userId: user.id,
      roles,
      tokenType: "refresh",
    };
    const newRefreshToken = generateRefreshToken(refreshPayload);

    await RefreshTokenModel.create({
      userId: user.id,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }).catch((err) => {
      // If token somehow conflicts, ignore for safety
      console.error("Refresh token save error:", err);
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}