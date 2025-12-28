import { IPermissionRepository } from "../../domain";
import { Permission } from "../../domain";
import { AppError } from "../../shared";

export class PermissionService {
    constructor(private permRepo: IPermissionRepository) {}

    async create(name: string, description?: string): Promise<Permission> {
        const exists = await this.permRepo.findByName(name);
        if (exists) throw new AppError("Permission already exists", 400);

        const permission = new Permission(
            "",            
            name,
            description
        );

        return this.permRepo.create(permission);
    }

    async findByName(name: string): Promise<Permission> {
        const permission = await this.permRepo.findByName(name);
        if (!permission) throw new AppError("Permission not found", 404);
        return permission;
    }

    async findById(id: string): Promise<Permission> {
        const permission = await this.permRepo.findById(id);
        if (!permission) throw new AppError("Permission not found", 404);
        return permission;
    }

    async deleteById(id: string): Promise<void> {
        const permission = await this.permRepo.findById(id);
        if (!permission) throw new AppError("Permission not found", 404);

        await this.permRepo.deleteById(id);
    }

    async listAll(): Promise<Permission[]> {
        if (typeof this.permRepo.listAll !== "function") {
            throw new AppError("Not Found", 500);
        }

        return this.permRepo.listAll();
    }
}