import { IProjectUserRepository } from "../../domain/repositories/ProjectUserRepository";

export class ProjectUserService {
  constructor(private repo: IProjectUserRepository) {}

  addUser(projectId: string, userId: string) {
    return this.repo.addUser(projectId, userId);
  }

  removeUser(projectId: string, userId: string) {
    return this.repo.removeUser(projectId, userId);
  }

  listUsers(projectId: string) {
    return this.repo.listUsers(projectId);
  }

  listProjects(userId: string) {
    return this.repo.listProjects(userId);
  }
}