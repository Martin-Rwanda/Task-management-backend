import { IUserRepository } from "../../domain";
import { User } from "../../domain";
import { UserModel } from "../database";
import { UserRoleModel } from "../database";

export class SequelizeUserRepository implements IUserRepository {
    async create(user: User): Promise<User> {
        const created = await UserModel.create({
            name: user.name,
            email: user.email,
            password: user.password,
            isActive: user.isActive
        });

        return new User(
            created.id,
            created.name,
            created.email,
            created.password,
            created.isActive,
            created.createdAt,
            created.updatedAt
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email } });
        return user
            ? new User(
                  user.id,
                  user.name,
                  user.email,
                  user.password,
                  user.isActive,
                  user.createdAt,
                  user.updatedAt
              )
            : null;
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findByPk(id);
        return user
            ? new User(
                  user.id,
                  user.name,
                  user.email,
                  user.password,
                  user.isActive,
                  user.createdAt,
                  user.updatedAt
              )
            : null;
    }

    async assignRole(userId: string, roleId: string): Promise<void> {
        const existing = await UserRoleModel.findOne({ where: { userId, roleId } });
        if (!existing) {
            await UserRoleModel.create({ userId, roleId });
        }
    }

    async removeRole(userId: string, roleId: string): Promise<void> {
        await UserRoleModel.destroy({ where: { userId, roleId } });
    }

    async listAll(): Promise<User[]> {
        const users = await UserModel.findAll();
        return users.map(
            u =>
                new User(
                    u.id,
                    u.name,
                    u.email,
                    u.password,
                    u.isActive,
                    u.createdAt,
                    u.updatedAt
                )
        );
    }
}