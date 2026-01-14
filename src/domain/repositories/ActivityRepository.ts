import { Activity } from "../entities/Activity";

export interface IActivityRepository {
  append(activity: Activity): Promise<void>;
  findAll(limit?: number): Promise<Activity[]>;
  findByUser(userId: string, limit?: number): Promise<Activity[]>;
}