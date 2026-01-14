import { IProjectRepository } from "../../domain/repositories/ProjectRepository";
import { Project } from "../../domain/entities/Project";

export class ProjectService {
  constructor(private repo: IProjectRepository) {}

  create(params : {name: string, ownerId: string, description?: string}) {
    return this.repo.create(Project.create(params));
  }

  findById(id: string) {
    return this.repo.findById(id);
  }

  listAll() {
    return this.repo.listAll();
  }

  addUser(projectId: string, userId: string) {
    return this.repo.addUser(projectId, userId);
  }

  removeUser(projectId: string, userId: string) {
    return this.repo.removeUser(projectId, userId);
  }

  listUsers(projectId: string) {
    return this.repo.listUsers(projectId);
  }
}
