import { Router } from "express";
import { RefreshController } from "../controllers/refresh.controller";
import { refreshService } from "../../shared/di";

const refreshRoutes = Router();
const controller = new RefreshController(refreshService);

refreshRoutes.post("/", controller.refreshToken);

export {refreshRoutes}