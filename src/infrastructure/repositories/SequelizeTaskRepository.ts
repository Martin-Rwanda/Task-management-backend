import { ITaskRepository } from "../../domain/repositories/TaskRepository";
import { safePriority, Task } from "../../domain/entities/Task";
import { TaskModel, TaskAssignmentModel } from "../database/models";

export class SequelizeTaskRepository implements ITaskRepository {
  async create(task: Task): Promise<Task> {
    const created = await TaskModel.create({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      boardId: task.boardId,
    });

    return Task.fromPersistence({
      id: created.id,
      title: created.title,
      description: created.description ?? "",
      priority: safePriority(created.priority) ?? null,
      dueDate: created.dueDate ?? new Date(),
      boardId: created.boardId,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
      deletedAt: created.deletedAt
    });
  }

  async findById(id: string): Promise<Task | null> {
    const task = await TaskModel.findByPk(id);
    if (!task) return null;

    return Task.fromPersistence({
      id: task.id,
      title: task.title,
      description: task.description ?? "",
      priority: safePriority(task.priority) ?? null,
      dueDate: task.dueDate ?? new Date(),
      boardId: task.boardId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt
    });
  }

  async listAll(boardId?: string): Promise<Task[]> {
    const where = boardId ? { boardId } : undefined;
    const tasks = await TaskModel.findAll({ where });

    return tasks.map(t =>
      Task.fromPersistence({
        id: t.id,
        title: t.title,
        description: t.description ?? "",
        priority: safePriority(t.priority) ?? null,
        dueDate: t.dueDate ?? new Date(),
        boardId: t.boardId,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        deletedAt: t.deletedAt
      })
    );
  }

  async assignUser(taskId: string, userId: string): Promise<void> {
    const existing = await TaskAssignmentModel.findOne({ where: { taskId, userId } });
    if (!existing) await TaskAssignmentModel.create({ taskId, userId });
  }

  async removeUser(taskId: string, userId: string): Promise<void> {
    await TaskAssignmentModel.destroy({ where: { taskId, userId } });
  }

  async listUsers(taskId: string): Promise<string[]> {
    const users = await TaskAssignmentModel.findAll({ where: { taskId } });
    return users.map(u => u.userId);
  }
}