import { IUserRepository } from "../../domain";
import { User } from "../../domain";
import { AppError } from "../../shared";

export class UserService {
    constructor(private userRepo: IUserRepository) {}

    async create(name: string, email: string, password: string, isActive = true): Promise<User> {
        const existing = await this.userRepo.findByEmail(email);
        if (existing) throw new AppError("User already exists", 400);

        const user = new User("", name, email, password, isActive, new Date(), new Date());
        return this.userRepo.create(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new AppError("User not found", 404);
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepo.findById(id);
        if (!user) throw new AppError("User not found", 404);
        return user;
    }

    async assignRole(userId: string, roleId: string): Promise<void> {
        const user = await this.userRepo.findById(userId);
        if (!user) throw new AppError("User not found", 404);

        await this.userRepo.assignRole(userId, roleId);
    }

    async removeRole(userId: string, roleId: string): Promise<void> {
        const user = await this.userRepo.findById(userId);
        if (!user) throw new AppError("User not found", 404);

        if (typeof this.userRepo.removeRole !== "function") {
            throw new AppError("removeRole method not implemented in repository", 500);
        }

        await this.userRepo.removeRole(userId, roleId);
    }

    async listAll(): Promise<User[]> {
        if (typeof this.userRepo.listAll !== "function") {
            throw new AppError("listAll method not implemented in repository", 500);
        }

        return this.userRepo.listAll();
    }
}