import { IRoleRepository } from "../../domain";
import { Role } from "../../domain";
import { RoleModel } from "../database";
import { RolePermissionModel } from "../database";

export class SequelizeRoleRepository implements IRoleRepository {
    async create(role: Role): Promise<Role> {
        const created = await RoleModel.create({
            name: role.name,
            description: role.description,
        });
        return new Role(created.id, created.name, created.description);
    }

    async findByName(name: string): Promise<Role | null> {
        const role = await RoleModel.findOne({ where: { name }});
        return role ? new Role(role.id, role.name, role.description): null;
    }

    async findById(id: string): Promise<Role | null> {
        const role = await RoleModel.findByPk(id);
        return role ? new Role(role.id, role.name, role.description): null;
    }

    async assignPermission(roleId: string, permissionId: string): Promise<void> {
        const existing = await RolePermissionModel.findOne({
            where: { roleId, permissionsId: permissionId }
        });

        if (existing) {
            return;
        }
        await RolePermissionModel.create({roleId, permissionId});
    }

    async removePermission(roleId: string, permissionId: string): Promise<void> {
        await RolePermissionModel.destroy({
            where: { roleId, permissionsId: permissionId }
        });
    }

    async listAll(): Promise<Role[]> {
        const roles = await RoleModel.findAll();
        return roles.map(
            r => new Role(r.id, r.name, r.description)
        );
    }
}