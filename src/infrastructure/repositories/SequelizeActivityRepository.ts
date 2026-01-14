import { IActivityRepository } from "../../domain/repositories/ActivityRepository";
import { Activity } from "../../domain/entities/Activity";
import { ActivityModel } from "../database/models/ActivityModel";

export class SequelizeActivityRepository implements IActivityRepository {
  async append(activity: Activity): Promise<void> {
    await ActivityModel.create({
      userId: activity.userId,
      action: activity.action,
      entity: activity.entity,
      entityId: activity.entityId,
    });
  }

  async findAll(limit = 100): Promise<Activity[]> {
    const rows = await ActivityModel.findAll({
      order: [["createdAt", "DESC"]],
      limit,
    });

    return rows.map(r =>
      Activity.fromPersistence({
        id: r.id,
        userId: r.userId,
        action: r.action,
        entity: r.entity,
        entityId: r.entityId,
        createdAt: r.createdAt,
      })
    );
  }

  async findByUser(userId: string, limit = 50): Promise<Activity[]> {
    const rows = await ActivityModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit,
    });

    return rows.map(r =>
      Activity.fromPersistence({
        id: r.id,
        userId: r.userId,
        action: r.action,
        entity: r.entity,
        entityId: r.entityId,
        createdAt: r.createdAt,
      })
    );
  }
}
