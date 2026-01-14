import { ITaskAssignmentRepository } from "../../domain/repositories/TaskAssignmentRepository";
import { TaskAssignmentModel } from "../database/models";

export class SequelizeTaskAssignmentRepository implements ITaskAssignmentRepository {
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

  async listTasks(userId: string): Promise<string[]> {
    const tasks = await TaskAssignmentModel.findAll({ where: { userId } });
    return tasks.map(t => t.taskId);
  }
}