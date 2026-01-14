import { Task } from "../entities/Task";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  listAll(boardId?: string): Promise<Task[]>;
  assignUser(taskId: string, userId: string): Promise<void>;
  removeUser(taskId: string, userId: string): Promise<void>;
  listUsers(taskId: string): Promise<string[]>;
}
