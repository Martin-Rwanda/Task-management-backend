import { IUserRepository } from "../../domain";
import { comparePassword } from "../../shared/utils/password";
import { generateAccessToken, generateRefreshToken } from "../../shared/utils/jwt";
import { RefreshTokenModel } from "../../infrastructure/database/models/RefreshTokenModel";
import { AppError } from "../../shared";
import { RoleModel, UserModel } from "../../infrastructure";

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

        const payload = {sub: user.id, roles};

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        await RefreshTokenModel.create({
            userId: user.id,
            token: refreshToken
        });

        return { accessToken, refreshToken, user};

    }
}