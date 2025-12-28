import { IRoleRepository } from "../../domain";
import { IPermissionRepository } from "../../domain";
import { AppError } from "../../shared";

export class AssignPermissionToRoleService {
    constructor(
        private roleRepo: IRoleRepository,
        private permRepo: IPermissionRepository
    ) {}

    async execute(roleId: string, permissionId: string) {
        const role = await this.roleRepo.findById(roleId);
        if (!role) throw new AppError("Role not found", 404);

        const perm = await this.permRepo.findById(permissionId);
        if (!perm) throw new AppError("Permission not found", 404);

        await this.roleRepo.assignPermission(roleId, permissionId);
    }
}