import { ProjectUser } from "../entities/ProjectUser";

export interface IProjectUserRepository {
    addUser(projectId: string, userId: string): Promise<void>;
    removeUser(projectId: string, userId: string): Promise<void>;
    listUsers(projectId: string): Promise<string[]>; // returns user IDs
    listProjects(userId: string): Promise<string[]>; // returns project IDs
}
