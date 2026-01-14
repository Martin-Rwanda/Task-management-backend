import { IActivityRepository } from "../../domain/repositories/ActivityRepository";
import { Activity } from "../../domain/entities/Activity";

export class ActivityService {
  constructor(private readonly repo: IActivityRepository) {}

  async record(params: {
    userId: string;
    action: string;
    entity: string;
    entityId: string;
  }): Promise<void> {
    const activity = Activity.create(params);
    await this.repo.append(activity);
  }

  getAll(limit?: number) {
    return this.repo.findAll(limit);
  }

  getByUser(userId: string, limit?: number) {
    return this.repo.findByUser(userId, limit);
  }
}
