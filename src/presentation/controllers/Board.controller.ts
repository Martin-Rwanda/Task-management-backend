import { Request, Response, NextFunction } from "express";
import { BoardService } from "../../application/services/BoardService";

export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, projectId } = req.body;
      const board = await this.boardService.create({ name, projectId });
      res.status(201).json(board);
    } catch (err) {
      next(err);
    }
  };

  listByProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.query.projectId as string;
      const limit = Number(req.query.limit) || 50;
      const boards = await this.boardService.getByProject(projectId, limit);
      res.json(boards);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await this.boardService.getById(req.params.id);
      if (!board) return res.status(404).json({ message: "Board not found" });
      res.json(board);
    } catch (err) {
      next(err);
    }
  };
}