import { Router } from "express";
import { PermissionController } from "../controllers/permission.controller";
import { AuthMiddleware } from "../../shared/middlewares/AuthMiddleware";
import { RbacMiddleware } from "../../shared/middlewares/RbacMiddleware";
import { permissionService } from "../../shared/di";

const permissionRoutes = Router();
const controller = new PermissionController(permissionService);

permissionRoutes.post(
    "/",
    AuthMiddleware,
    RbacMiddleware("permission:create"),
    controller.createPermission
);

permissionRoutes.get(
    "/",
    AuthMiddleware,
    RbacMiddleware("permission:view"),
    controller.listPermissions
);

permissionRoutes.get(
    "/:id",
    AuthMiddleware,
    RbacMiddleware("permission:view"),
    controller.findById
);

permissionRoutes.get(
    "/name/:name",
    AuthMiddleware,
    RbacMiddleware("permission:view"),
    controller.findByName
);

permissionRoutes.delete(
    "/:id",
    AuthMiddleware,
    RbacMiddleware("permission:delete"),
    controller.deleteById
);

export {permissionRoutes};