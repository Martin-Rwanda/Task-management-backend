import { Project } from "../entities/Project";

export interface IProjectRepository {
  create(project: Project): Promise<Project>;
  findById(id: string): Promise<Project | null>;
  listAll(): Promise<Project[]>;
  addUser(projectId: string, userId: string): Promise<void>;
  removeUser(projectId: string, userId: string): Promise<void>;
  listUsers(projectId: string): Promise<string[]>;
}
