import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userService } from "../../shared/di";
import { RbacMiddleware, AuthMiddleware } from "../../shared";

const userRoutes = Router();
const controller = new UserController(userService);

userRoutes.post("/", AuthMiddleware, controller.createUser);
userRoutes.get("/", AuthMiddleware, controller.listUsers);
userRoutes.post("/assign-role", AuthMiddleware, controller.assignRole);
userRoutes.get("/:id", AuthMiddleware, controller.getUserById);
userRoutes.post("/assign-role", AuthMiddleware, controller.assignRole);
userRoutes.post("/remove-role", AuthMiddleware, controller.removeRole);

export {userRoutes};