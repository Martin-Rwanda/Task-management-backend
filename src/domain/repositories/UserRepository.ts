import { User } from "../entities";

export interface IUserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User |null>;
    assignRole(userId: string, roleId: string): Promise<void>;
    removeRole(userId: string, roleId: string): Promise<void>;
    listAll(): Promise<User[]>;
}