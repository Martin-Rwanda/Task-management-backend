import jwt, { JwtPayload } from "jsonwebtoken";
import { AccessTokenPayload } from "../../application/dtos/AccessTokenPayload";
import { jwtConfig } from "../../config/jwt.config";
import { RefreshTokenPayload } from "../../application/dtos/RefreshTokenPayload";

export const generateAccessToken = (
    payload: AccessTokenPayload
): string => {
    return jwt.sign(
        payload,
        jwtConfig.accessSecret,
        {
            expiresIn: "1h",
            algorithm: "HS256",
        }
    );
};

export const generateRefreshToken = (
    payload: AccessTokenPayload
): string => {
    return jwt.sign(
        { ...payload, tokenType: "refresh" },
        jwtConfig.refreshSecret,
        {
            expiresIn: "7d",
            algorithm: "HS256",
        }
    );
};

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, jwtConfig.accessSecret) as JwtPayload;
};

export const verifyRefreshToken = (
    token: string
): RefreshTokenPayload => {
    return jwt.verify(
        token,
        jwtConfig.refreshSecret
    ) as RefreshTokenPayload;
};