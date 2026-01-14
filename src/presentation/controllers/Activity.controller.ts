import { Request, Response } from "express";
import { ActivityService } from "../../application/services/ActivityService";

export class ActivityController {
  constructor(private readonly service: ActivityService) {}

  listAll = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 100;
    res.json(await this.service.getAll(limit));
  };

  listByUser = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 50;
    res.json(await this.service.getByUser(req.params.userId, limit));
  };
}
