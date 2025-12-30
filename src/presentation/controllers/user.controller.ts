import { Request, Response, NextFunction } from "express";
import { UserService } from "../../application/services/UserService";

export class UserController {
    constructor(private userService: UserService) {}

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;
            const user = await this.userService.create(name, email, password);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    };

    listUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.listAll();
            res.json(users);
        } catch (err) {
            next(err);
        }
    };

    getUserById = async (req: Request, res: Response) => {
        const user = await this.userService.findById(req.params.id);
        res.status(200).json(user);
    };
    assignRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, roleId } = req.body;
            await this.userService.assignRole(userId, roleId);
            res.json({ message: "Role assigned" });
        } catch (err) {
            next(err);
        }
    };
    removeRole = async (req: Request, res: Response) => {
        const { userId, roleId } = req.body;
        await this.userService.removeRole(userId, roleId);
        res.status(200).json({ message: "Role removed" });
    };
}