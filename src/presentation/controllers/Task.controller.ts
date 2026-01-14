import { Request, Response, NextFunction } from "express";
import { TaskService } from "../../application/services/TaskService";

export class TaskController {
  constructor(private service: TaskService) {}

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, boardId, description, priority, dueDate } = req.body;
      const task = await this.service.create(title, boardId, description, priority, dueDate ? new Date(dueDate) : undefined);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  };

  listTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.query;
      const tasks = await this.service.listAll(boardId as string);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };

  getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.service.findById(req.params.id);
      res.json(task);
    } catch (err) {
      next(err);
    }
  };

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
      const users = await this.service.listUsers(req.params.id);
      res.json(users);
    } catch (err) {
      next(err);
    }
  };
}