import { IUserRepository } from "../../domain";
import { IRoleRepository } from "../../domain";
import { AppError } from "../../shared";

export class AssignRoleToUserService {
    constructor(
        private userRepo: IUserRepository,
        private roleRepo: IRoleRepository
    ) {}

    async execute(userId: string, roleId: string): Promise<void> {
        const user = await this.userRepo.findById(userId);
        if (!user) throw new AppError("User not found", 404);

        const role = await this.roleRepo.findById(roleId);
        if (!role) throw new AppError("Role not found", 404);


        await this.userRepo.assignRole(userId, roleId);
    }
}