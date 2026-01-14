import { IProjectRepository } from "../../domain/repositories/ProjectRepository";
import { Project } from "../../domain/entities/Project";
import { ProjectModel, ProjectUserModel } from "../database/models";

export class SequelizeProjectRepository implements IProjectRepository {
  async create(project: Project): Promise<Project> {
    const created = await ProjectModel.create({
      name: project.name,
      ownerId: project.ownerId,
      description: project.description,
    });
    return Project.fromPersistence({
      id :created.id,
      name :created.name,
      ownerId :created.ownerId,
      description :created.description,
      createdAt :created.createdAt,
      updatedAt :created.updatedAt,
      deletedAt :created.deletedAt
    });
  }

  async findById(id: string): Promise<Project | null> {
    const project = await ProjectModel.findByPk(id);
    if (!project) return null;
    return Project.fromPersistence({
      id : project.id,
      name :project.name,
      ownerId :project.ownerId,
      description :project.description,
      createdAt :project.createdAt,
      updatedAt :project.updatedAt,
      deletedAt :project.deletedAt
    });
  }

  async listAll(): Promise<Project[]> {
    const projects = await ProjectModel.findAll({ order: [["createdAt", "DESC"]] });
    return projects.map(
      p => Project.fromPersistence({
        id :p.id, 
        name :p.name, 
        ownerId :p.ownerId, 
        description :p.description, 
        createdAt :p.createdAt, 
        updatedAt :p.updatedAt, 
        deletedAt :p.deletedAt
      })
    );
  }

  async addUser(projectId: string, userId: string): Promise<void> {
    const existing = await ProjectUserModel.findOne({ where: { projectId, userId } });
    if (!existing) await ProjectUserModel.create({ projectId, userId });
  }

  async removeUser(projectId: string, userId: string): Promise<void> {
    await ProjectUserModel.destroy({ where: { projectId, userId } });
  }

  async listUsers(projectId: string): Promise<string[]> {
    const rows = await ProjectUserModel.findAll({ where: { projectId } });
    return rows.map(r => r.userId);
  }
}
