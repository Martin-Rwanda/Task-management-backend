import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userService } from "../../shared/di";
import { AuthMiddleware } from "../../shared/middlewares/AuthMiddleware";

const userRoutes = Router();
const controller = new UserController(userService);

userRoutes.post("/", controller.createUser);
userRoutes.get("/", controller.listUsers);
userRoutes.post("/assign-role", controller.assignRole);
userRoutes.get("/:id", AuthMiddleware, controller.getUserById);
userRoutes.post("/assign-role", AuthMiddleware, controller.assignRole);
userRoutes.post("/remove-role", AuthMiddleware, controller.removeRole);

export {userRoutes};