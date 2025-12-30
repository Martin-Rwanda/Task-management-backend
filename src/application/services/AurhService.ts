import { IUserRepository } from "../../domain";
import { comparePassword } from "../../shared/utils/password";
import { generateAccessToken, generateRefreshToken } from "../../shared/utils/jwt";
import { RefreshTokenModel } from "../../infrastructure/database/models/RefreshTokenModel";
import { AppError } from "../../shared";

export class AuthService {
    constructor(private authRepo: IUserRepository) {}

    async login(email: string, password: string) {
        const user = await this.authRepo.findByEmail(email);
        if(!user) throw new AppError("Inalid credentials", 401);

        const valid = await comparePassword(password, user.password);
        if(!valid) throw new AppError("Invalid credentials", 401);

        const payload = {sub: user.id, role: user.role};

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        await RefreshTokenModel.create({
            userId: user.id,
            token: refreshToken
        });

        return { accessToken, refreshToken};

    }
}