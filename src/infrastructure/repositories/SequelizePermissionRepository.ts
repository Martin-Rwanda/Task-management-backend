import { IPermissionRepository } from "../../domain";
import { Permission } from "../../domain";
import { PermissionModel } from "../database";

export class SequelizePermissionRepository implements IPermissionRepository {
    async create(permission: Permission): Promise<Permission> {
        const created = await PermissionModel.create({
            name: permission.name,
            description: permission.description
        });

        return new Permission(created.id, created.name, created.description);
    }

    async findByName(name: string): Promise<Permission | null> {
        const perm = await PermissionModel.findOne({ where: {name}});
        return perm ? new Permission(perm.id, perm.name, perm.description) : null;
    }

    async findById(id: string): Promise<Permission | null> {
        const perm = await PermissionModel.findByPk(id);
        return perm ? new Permission(perm.id, perm.name, perm.description) : null;
    }

    async listAll(): Promise<Permission[]> {
        const perms = await PermissionModel.findAll();
        return perms.map(p => new Permission(p.id, p.name, p.description));
    }

    async deleteById(id: string): Promise<void> {
        await PermissionModel.destroy({ where: { id } });
    }
}