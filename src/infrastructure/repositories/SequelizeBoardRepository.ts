import { IBoardRepository } from "../../domain/repositories/BoardRepository";
import { Board } from "../../domain/entities/Board";
import { BoardModel } from "../database/models/BoardModel";

export class SequelizeBoardRepository implements IBoardRepository {
  async create(board: Board): Promise<Board> {
    const created = await BoardModel.create({
      name: board.name,
      projectId: board.projectId,
    });

    return Board.fromPersistence({
      id: created.id,
      name: created.name,
      projectId: created.projectId,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
      deletedAt: created.deletedAt,
    });
  }

  async findById(id: string): Promise<Board | null> {
    const row = await BoardModel.findByPk(id);
    if (!row) return null;

    return Board.fromPersistence({
      id: row.id,
      name: row.name,
      projectId: row.projectId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    });
  }

  async findByProject(projectId: string, limit = 50): Promise<Board[]> {
    const rows = await BoardModel.findAll({
      where: { projectId },
      order: [["createdAt", "ASC"]],
      limit,
    });

    return rows.map(row =>
      Board.fromPersistence({
        id: row.id,
        name: row.name,
        projectId: row.projectId,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
      })
    );
  }
}
