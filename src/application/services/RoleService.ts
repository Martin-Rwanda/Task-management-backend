import { IRoleRepository } from "../../domain";
import { Role } from "../../domain";
import { AppError } from "../../shared";

export class RoleService {
    constructor(private roleRepo: IRoleRepository) {}

    async create(name: string, description?: string): Promise<Role> {
        const exists = await this.roleRepo.findByName(name);
        if (exists) throw new AppError("Role already exists", 400);

        const newRole = new Role(
            "",         
            name,
            description
        );

        return this.roleRepo.create(newRole);
    }

    async findByName(name: string): Promise<Role> {
        const role = await this.roleRepo.findByName(name);
        if (!role) throw new AppError("Role not found", 404);
        return role;
    }

    async findById(id: string): Promise<Role> {
        const role = await this.roleRepo.findById(id);
        if (!role) throw new AppError("Role not found", 404);
        return role;
    }

    async assignPermission(roleId: string, permissionId: string): Promise<void> {
        const role = await this.roleRepo.findById(roleId);
        if (!role) throw new AppError("Role not found", 404);

        await this.roleRepo.assignPermission(roleId, permissionId);
    }

    async removePermission(roleId: string, permissionId: string): Promise<void> {
        const role = await this.roleRepo.findById(roleId);
        if (!role) throw new AppError("Role not found", 404);

        if (typeof this.roleRepo.removePermission !== "function") {
            throw new AppError("removePermission method not implemented in repository", 500);
        }

        await this.roleRepo.removePermission(roleId, permissionId);
    }

    async listAll(): Promise<Role[]> {
        if (typeof this.roleRepo.listAll !== "function") {
            throw new AppError("Not Found", 400);
        }

        return this.roleRepo.listAll();
    }
}