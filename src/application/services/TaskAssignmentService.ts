import { ITaskAssignmentRepository } from "../../domain/repositories/TaskAssignmentRepository";

export class TaskAssignmentService {
  constructor(private repo: ITaskAssignmentRepository) {}

  assignUser(taskId: string, userId: string) {
    return this.repo.assignUser(taskId, userId);
  }

  removeUser(taskId: string, userId: string) {
    return this.repo.removeUser(taskId, userId);
  }

  listUsers(taskId: string) {
    return this.repo.listUsers(taskId);
  }

  listTasks(userId: string) {
    return this.repo.listTasks(userId);
  }
}
