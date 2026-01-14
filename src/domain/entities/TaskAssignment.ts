export class TaskAssignment {
  readonly taskId: string;
  readonly userId: string;
  readonly createdAt: Date;

  private constructor(taskId: string, userId: string, createdAt: Date) {
    this.taskId = taskId;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  static create(taskId: string, userId: string): TaskAssignment {
    return new TaskAssignment(taskId, userId, new Date());
  }
}