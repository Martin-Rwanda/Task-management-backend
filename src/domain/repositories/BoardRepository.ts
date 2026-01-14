import { Board } from "../entities/Board";

export interface IBoardRepository {
  create(board: Board): Promise<Board>;
  findById(id: string): Promise<Board | null>;
  findByProject(projectId: string, limit?: number): Promise<Board[]>;
}
