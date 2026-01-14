import { env } from "../config/env";

if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const jwtConfig = {
    accessSecret: env.JWT_SECRET,
    refreshSecret: env.JWT_SECRET_REFRESH,
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '15m',
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL || '7d',
};