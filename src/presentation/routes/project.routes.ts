import { Router } from "express";
import { ProjectController } from "../controllers/Project.controller";
import { projectService } from "../../shared";

const controller = new ProjectController(projectService);
const projectRouter = Router();

projectRouter.post("/", controller.createProject);
projectRouter.get("/", controller.listProjects);
projectRouter.get("/:id", controller.getProjectById);
projectRouter.post("/add-user", controller.addUser);
projectRouter.post("/remove-user", controller.removeUser);

export { projectRouter };