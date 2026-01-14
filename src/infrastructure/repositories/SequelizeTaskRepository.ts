import { ITaskRepository } from "../../domain/repositories/TaskRepository";
import { Task } from "../../domain/entities/Task";
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
      id : created.id,
      title :created.title,
      description :created.description,
      priority :created.priority,
      dueDate :created.dueDate,
      boardId :created.boardId,
      createdAt :created.createdAt,
      updatedAt :created.updatedAt,
      deletedAt :created.deletedAt
    });
  }

  async findById(id: string): Promise<Task | null> {
    const task = await TaskModel.findByPk(id);
    if (!task) return null;
    return new Task(
      task.id,
      task.title,
      task.description,
      task.priority as any,
      task.dueDate,
      task.boardId,
      task.createdAt,
      task.updatedAt,
      task.deletedAt
    );
  }

  async listAll(boardId?: string): Promise<Task[]> {
    const where = boardId ? { boardId } : undefined;
    const tasks = await TaskModel.findAll({ where });
    return tasks.map(
      t => new Task(t.id, t.title, t.description, t.priority as any, t.dueDate, t.boardId, t.createdAt, t.updatedAt, t.deletedAt)
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
