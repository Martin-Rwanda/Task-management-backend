import { Role } from "../entities";

export interface IRoleRepository {
    create(role: Role): Promise<Role>;
    findByName(name: string): Promise<Role | null>;
    findById(id: string): Promise<Role | null>;
    assignPermission(roleId: string, permissionId: string): Promise<void>;
    removePermission(roleId: string, permission: string): Promise<void>;
    listAll(): Promise<Role[]>;
}