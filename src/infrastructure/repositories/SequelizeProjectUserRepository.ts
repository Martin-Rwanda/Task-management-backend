import { IProjectUserRepository } from "../../domain/repositories/ProjectUserRepository";
import { ProjectUserModel } from "../database";

export class SequelizeProjectUserRepository implements IProjectUserRepository {
  async addUser(projectId: string, userId: string): Promise<void> {
    const exists = await ProjectUserModel.findOne({ where: { projectId, userId } });
    if (!exists) await ProjectUserModel.create({ projectId, userId });
  }

  async removeUser(projectId: string, userId: string): Promise<void> {
    await ProjectUserModel.destroy({ where: { projectId, userId } });
  }

  async listUsers(projectId: string): Promise<string[]> {
    const users = await ProjectUserModel.findAll({ where: { projectId } });
    return users.map(u => u.userId);
  }

  async listProjects(userId: string): Promise<string[]> {
    const projects = await ProjectUserModel.findAll({ where: { userId } });
    return projects.map(p => p.projectId);
  }
}