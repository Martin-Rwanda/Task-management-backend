import { ITaskRepository } from "../../domain/repositories/TaskRepository";
import { Task } from "../../domain/entities/Task";

export class TaskService {
  constructor(private repo: ITaskRepository) {}

  create(title: string, boardId: string, description?: string, priority?: "low"|"medium"|"high", dueDate?: Date) {
    return this.repo.create(Task.create(title, boardId, description, priority, dueDate));
  }

  findById(id: string) {
    return this.repo.findById(id);
  }

  listAll(boardId?: string) {
    return this.repo.listAll(boardId);
  }

  assignUser(taskId: string, userId: string) {
    return this.repo.assignUser(taskId, userId);
  }

  removeUser(taskId: string, userId: string) {
    return this.repo.removeUser(taskId, userId);
  }

  listUsers(taskId: string) {
    return this.repo.listUsers(taskId);
  }
}