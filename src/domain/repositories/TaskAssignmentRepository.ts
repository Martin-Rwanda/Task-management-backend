export interface ITaskAssignmentRepository {
  assignUser(taskId: string, userId: string): Promise<void>;
  removeUser(taskId: string, userId: string): Promise<void>;
  listUsers(taskId: string): Promise<string[]>;
  listTasks(userId: string): Promise<string[]>;
}