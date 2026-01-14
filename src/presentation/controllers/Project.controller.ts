import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../../application/services/ProjectService";

export class ProjectController {
  constructor(private service: ProjectService) {}

  createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, ownerId, description } = req.body;
      const project = await this.service.create(name, ownerId, description);
      res.status(201).json(project);
    } catch (err) {
      next(err);
    }
  };

  listProjects = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await this.service.listAll();
      res.json(projects);
    } catch (err) {
      next(err);
    }
  };

  getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await this.service.findById(req.params.id);
      res.json(project);
    } catch (err) {
      next(err);
    }
  };

  addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, userId } = req.body;
      await this.service.addUser(projectId, userId);
      res.json({ message: "User added to project" });
    } catch (err) {
      next(err);
    }
  };

  removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, userId } = req.body;
      await this.service.removeUser(projectId, userId);
      res.json({ message: "User removed from project" });
    } catch (err) {
      next(err);
    }
  };
}