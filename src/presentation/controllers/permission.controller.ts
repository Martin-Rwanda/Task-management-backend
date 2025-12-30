import { Request, Response, NextFunction } from "express";
import { PermissionService } from "../../application/services/PermissionService";

export class PermissionController {
    constructor(private permService: PermissionService) {}

    createPermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;
            const permission = await this.permService.create(name, description);
            res.status(201).json(permission);
        } catch (err) {
            next(err);
        }
    };

    findByName = async (req: Request, res: Response) => {
        const { name } = req.params;
        const permission = await this.permService.findByName(name);
        res.json(permission);
    };

    findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const permission = await this.permService.findById(id);
        res.json(permission);
    };

    deleteById = async (req: Request, res: Response) => {
        const { id } = req.params;
        await this.permService.deleteById(id);
        res.status(204).send();
    };

    listPermissions = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const permissions = await this.permService.listAll();
            res.json(permissions);
        } catch (err) {
            next(err);
        }
    };
}