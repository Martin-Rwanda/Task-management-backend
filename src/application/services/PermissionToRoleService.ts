import { IRoleRepository } from "../../domain";
import { AppError } from "../../shared";

export class PermissionToRoleService {
    constructor(private roleRepo: IRoleRepository) {}

    async assign(roleId: string, permissionId: string): Promise<void> {
        const role = await this.roleRepo.findById(roleId);
        if (!role) throw new AppError("Role not found", 404);

        await this.roleRepo.assignPermission(roleId, permissionId);
    }

    async remove(roleId: string, permissionId: string): Promise<void> {
        const role = await this.roleRepo.findById(roleId);
        if (!role) throw new AppError("Role not found", 404);

        // this assumes you will implement removePermission in repo
        if (!this.roleRepo.removePermission) {
            throw new AppError("removePermission not implemented", 500);
        }

        await this.roleRepo.removePermission(roleId, permissionId);
    }
}