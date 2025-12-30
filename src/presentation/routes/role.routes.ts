import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { roleService } from "../../shared/di";
import { AuthMiddleware } from "../../shared/middlewares/AuthMiddleware";

const roleRoutes = Router();
const controller = new RoleController(roleService);

roleRoutes.post("/", controller.createRole);
roleRoutes.get("/", controller.listRoles);
roleRoutes.post("/assign-permission", AuthMiddleware, controller.assignPermission);
roleRoutes.post("/remove-permission", AuthMiddleware, controller.removePermission);

export {roleRoutes};