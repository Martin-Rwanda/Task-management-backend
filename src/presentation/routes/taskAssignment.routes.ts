import { Router } from "express";
import { TaskAssignmentController } from "../controllers/TaskAssignment.controller";
import { taskAssignmentService } from "../../shared";

const controller = new TaskAssignmentController(taskAssignmentService);
const taskAssignmentRouter = Router();

taskAssignmentRouter.post("/assign", controller.assignUser);
taskAssignmentRouter.post("/remove", controller.removeUser);
taskAssignmentRouter.get("/task/:taskId/users", controller.listUsers);
taskAssignmentRouter.get("/user/:userId/tasks", controller.listTasks);

export { taskAssignmentRouter };