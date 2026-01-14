import { Request, Response, NextFunction } from "express";
import { TaskAssignmentService } from "../../application/services/TaskAssignmentService";

export class TaskAssignmentController {
  constructor(private service: TaskAssignmentService) {}

  assignUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, userId } = req.body;
      await this.service.assignUser(taskId, userId);
      res.json({ message: "User assigned to task" });
    } catch (err) {
      next(err);
    }
  };

  removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, userId } = req.body;
      await this.service.removeUser(taskId, userId);
      res.json({ message: "User removed from task" });
    } catch (err) {
      next(err);
    }
  };

  listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.listUsers(req.params.taskId);
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  listTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.service.listTasks(req.params.userId);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };
}