// interface/controllers/ProjectUser.controller.ts
import { Request, Response, NextFunction } from "express";
import { ProjectUserService } from "../../application/services/ProjectUserService";

export class ProjectUserController {
  constructor(private service: ProjectUserService) {}

  addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, userId } = req.body;
      if (!projectId || !userId) {
        return res.status(400).json({ message: "projectId and userId are required" });
      }

      await this.service.addUser(projectId, userId);
      res.status(201).json({ message: "User added to project" });
    } catch (err) {
      next(err);
    }
  };

  removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, userId } = req.body;
      if (!projectId || !userId) {
        return res.status(400).json({ message: "projectId and userId are required" });
      }

      await this.service.removeUser(projectId, userId);
      res.json({ message: "User removed from project" });
    } catch (err) {
      next(err);
    }
  };

 
  listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      if (!projectId) {
        return res.status(400).json({ message: "projectId is required" });
      }

      const users = await this.service.listUsers(projectId);
      res.json({ projectId, users });
    } catch (err) {
      next(err);
    }
  };

  
  listProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }

      const projects = await this.service.listProjects(userId);
      res.json({ userId, projects });
    } catch (err) {
      next(err);
    }
  };
}