import { IBoardRepository } from "../../domain/repositories/BoardRepository";
import { Board } from "../../domain/entities/Board";

export class BoardService {
  constructor(private readonly boardRepo: IBoardRepository) {}

  async create(params: { name: string; projectId: string }): Promise<Board> {
    const board = Board.create(params);
    return this.boardRepo.create(board);
  }

  getById(id: string) {
    return this.boardRepo.findById(id);
  }

  getByProject(projectId: string, limit?: number) {
    return this.boardRepo.findByProject(projectId, limit);
  }
}