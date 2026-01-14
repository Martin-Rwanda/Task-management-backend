import { Router } from "express";
import { ActivityController } from "../controllers/Activity.controller";
import { activityService } from "../../shared";
import { AuthMiddleware } from "../../shared";

const activityRoutes = Router();
const controller = new ActivityController(activityService);

activityRoutes.get("/", AuthMiddleware, controller.listAll);
activityRoutes.get("/user/:userId", AuthMiddleware, controller.listByUser);

export { activityRoutes };


// GET /activities
// GET /activities/user/:userId
// GET /activities/project/:projectId
// GET /activities/task/:taskId