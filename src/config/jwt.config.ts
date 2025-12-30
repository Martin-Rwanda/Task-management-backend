import { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const jwtConfig = {
    accessSecret: env.JWT_SECRET,
    refreshSecret: env.JWT_SECRET_REFRESH,
};

