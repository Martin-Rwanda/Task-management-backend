import { Permission } from "../entities";

export interface IPermissionRepository {
    create(permission: Permission): Promise<Permission>;
    findByName(name: string): Promise<Permission | null>;
    findById(id: string): Promise<Permission | null>;
    listAll(): Promise<Permission[]>;
    deleteById(id: string): Promise<void>
}