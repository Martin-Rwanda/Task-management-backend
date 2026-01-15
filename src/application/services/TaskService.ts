import { ITaskRepository } from "../../domain/repositories/TaskRepository";
import { Task, safePriority } from "../../domain/entities/Task";

interface CreateTaskParams {
  title: string;
  boardId: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: Date;
}

export class TaskService {
  constructor(private repo: ITaskRepository) {}

  async create(params: CreateTaskParams): Promise<Task> {
    const task = Task.create({
      title: params.title,
      boardId: params.boardId,
      description: params.description ?? "",
      priority: params.priority ?? null,
      dueDate: params.dueDate ?? new Date()
    });

    return this.repo.create(task);
  }

  async findById(id: string): Promise<Task | null> {
    return this.repo.findById(id);
  }

  async listAll(boardId?: string): Promise<Task[]> {
    return this.repo.listAll(boardId);
  }

  async assignUser(taskId: string, userId: string): Promise<void> {
    return this.repo.assignUser(taskId, userId);
  }

  async removeUser(taskId: string, userId: string): Promise<void> {
    return this.repo.removeUser(taskId, userId);
  }

  async listUsers(taskId: string): Promise<string[]> {
    return this.repo.listUsers(taskId);
  }
}