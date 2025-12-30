import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { UserModel } from "../../infrastructure";
import { RoleModel } from "../../infrastructure";
import { PermissionModel } from "../../infrastructure";

interface UserWithRoles extends UserModel {
    roles?: Array<RoleModel & { permissions?: PermissionModel[] }>;
}  //type

export const RbacMiddleware = (requiredPermission: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new AppError("Unauthorized", 401);
        }

        const user = await UserModel.findByPk(req.user.id, {
            include: {
                model: RoleModel, as: "roles",
                include: [{ model: PermissionModel, as: "permissions" }]
            },
        }) as UserWithRoles;

        if (!user) throw new AppError("User not found", 404);

        const permissions = new Set<string>();

        (user.roles || []).forEach((role) => {
            (role.permissions || []).forEach((perm) => {
                permissions.add(perm.name);
            });
        });

        if (!permissions.has(requiredPermission)) {
            throw new AppError("Forbidden", 403);
        }

        next();
    };