import { Request, Response, NextFunction } from "express";
import { RoleService } from "../../application/services/RoleService";

export class RoleController {
    constructor(private roleService: RoleService) {}

    createRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;
            const role = await this.roleService.create(name, description);
            res.status(201).json(role);
        } catch (err) {
            next(err);
        }
    };

    listRoles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roles = await this.roleService.listAll();
            res.json(roles);
        } catch (err) {
            next(err);
        }
    };
    assignPermission = async (req: Request, res: Response) => {
        const { roleId, permissionId } = req.body;
        await this.roleService.assignPermission(roleId, permissionId);
        res.status(200).json({ message: "Permission assigned" });
    };

    removePermission = async (req: Request, res: Response) => {
        const { roleId, permissionId } = req.body;
        await this.roleService.removePermission(roleId, permissionId);
        res.status(200).json({ message: "Permission removed" });
    };
}