import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authService } from "../../shared/di";

const authRoutes = Router();
const controller = new AuthController(authService);

authRoutes.post("/login", controller.login);
authRoutes.post("/logout", controller.logout);
authRoutes.post("/refresh", controller.refreshToken);

export {authRoutes};