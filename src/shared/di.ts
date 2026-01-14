import { SequelizeUserRepository } from "../infrastructure";
import { AuthService } from "../application/services/AurhService";
import { UserService } from "../application/services/UserService";
import { RoleService } from "../application/services/RoleService";
import { PermissionService } from "../application/services/PermissionService";
import { SequelizeRoleRepository } from "../infrastructure";
import { SequelizePermissionRepository } from "../infrastructure";
import { RefreshTokenService } from "../application/services/RefreshTokenService";
import { SequelizeAuditLogRepository } from "../infrastructure/repositories/SequelizeAuditLogRepository";
import { AuditLogService } from "../application/services/AudithLogService";
import { ActivityService } from "../application/services/ActivityService";
import { SequelizeActivityRepository } from "../infrastructure/repositories/SequelizeActivityRepository";
import { BoardService } from "../application/services/BoardService";
import { SequelizeBoardRepository } from "../infrastructure/repositories/SequelizeBoardRepository";
import { ProjectService } from "../application/services/ProjectService";
import { ProjectUserService } from "../application/services/ProjectUserService";
import { SequelizeProjectRepository } from "../infrastructure/repositories/SequelizeProjectRepository";
import { SequelizeProjectUserRepository } from "../infrastructure/repositories/SequelizeProjectUserRepository";
import { TaskService } from "../application/services/TaskService";
import { TaskAssignmentService } from "../application/services/TaskAssignmentService";
import { SequelizeTaskRepository } from "../infrastructure/repositories/SequelizeTaskRepository";
import { SequelizeTaskAssignmentRepository } from "../infrastructure/repositories/SequelizeTaskAssignmentRepository";

// my repositories
export const userRepo = new SequelizeUserRepository();
export const roleRepo = new SequelizeRoleRepository();
export const permRepo = new SequelizePermissionRepository();

export const auditLogRepo = new SequelizeAuditLogRepository();
// task repository
export const activityRepo = new SequelizeActivityRepository();
export const boardRepo = new SequelizeBoardRepository();
export const projectRepo = new SequelizeProjectRepository();
export const projectUserRepo = new  SequelizeProjectUserRepository();
export const taskRepo = new SequelizeTaskRepository();
export const taskAssignmentRepo = new SequelizeTaskAssignmentRepository();


// my services
export const authService = new AuthService(userRepo);
export const userService = new UserService(userRepo);
export const roleService = new RoleService(roleRepo);
export const permissionService = new PermissionService(permRepo);
export const refreshService = new RefreshTokenService()
export const auditLogService = new AuditLogService(auditLogRepo);

// task services
export const activityService = new ActivityService(activityRepo);
export const boardService = new BoardService(boardRepo);
export const projectService = new ProjectService(projectRepo);
export const projectUserService = new ProjectUserService(projectUserRepo);
export const taskService = new TaskService(taskRepo);
export const taskAssignmentService = new TaskAssignmentService(taskAssignmentRepo)