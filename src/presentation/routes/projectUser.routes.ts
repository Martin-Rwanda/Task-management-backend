import { Router } from "express";
import { ProjectUserController } from "../controllers/ProjectUser.controller";
import { projectUserService } from "../../shared";

const controller = new ProjectUserController(projectUserService);
const projectUserRouter = Router();

projectUserRouter.post("/add", controller.addUser);
projectUserRouter.post("/remove", controller.removeUser);
projectUserRouter.get("/project/:projectId/users", controller.listUsers);
projectUserRouter.get("/user/:userId/projects", controller.listProjects);

export { projectUserRouter };