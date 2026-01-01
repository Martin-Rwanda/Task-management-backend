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

// Repositories
export const userRepo = new SequelizeUserRepository();
export const roleRepo = new SequelizeRoleRepository();
export const permRepo = new SequelizePermissionRepository();
export const auditLogRepo = new SequelizeAuditLogRepository();

// Services
export const authService = new AuthService(userRepo);
export const userService = new UserService(userRepo);
export const roleService = new RoleService(roleRepo);
export const permissionService = new PermissionService(permRepo);
export const refreshService = new RefreshTokenService()
export const auditLogService = new AuditLogService(auditLogRepo);