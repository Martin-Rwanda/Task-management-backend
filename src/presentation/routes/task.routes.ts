import { Router } from "express";
import { TaskController } from "../controllers/Task.controller";
import { taskService } from "../../shared";

const controller = new TaskController(taskService);
const taskRouter = Router();

taskRouter.post("/", controller.createTask);
taskRouter.get("/", controller.listTasks);
taskRouter.get("/:id", controller.getTaskById);
taskRouter.post("/assign-user", controller.assignUser);
taskRouter.post("/remove-user", controller.removeUser);
taskRouter.get("/:id/users", controller.listUsers);

export { taskRouter };