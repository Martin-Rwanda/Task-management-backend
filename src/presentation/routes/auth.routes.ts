import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authService } from "../../shared/di";

const authRoutes = Router();
const controller = new AuthController(authService);

authRoutes.post("/login", controller.login);

export {authRoutes};