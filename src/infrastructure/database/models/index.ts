import { sequelize } from "../sequelizer";
import { UserModel } from "./UserModel";
import { RoleModel } from "./RoleModel";
import { PermissionModel } from "./PermissionModel";
import { UserRoleModel } from "./UserRoleModel";
import { RolePermissionModel } from "./RolePermissionModel";
import { RefreshTokenModel } from "./RefreshTokenModel";
import { ActivityModel } from "./ActivityModel";
import { BoardModel } from "./BoardModel";
import { ProjectModel } from "./ProjectModel";
import { ProjectUserModel } from "./ProjectUserModel";
import { TaskModel } from "./TaskModel";
import { TaskAssignmentModel } from "./TaskAssignmentModel";

UserModel.initialize(sequelize);
RoleModel.initialize(sequelize);
PermissionModel.initialize(sequelize);
UserRoleModel.initialize(sequelize);
RolePermissionModel.initialize(sequelize);
RefreshTokenModel.initialize(sequelize);
ProjectModel.initialize(sequelize);
ProjectUserModel.initialize(sequelize);
TaskAssignmentModel.initialize(sequelize);
BoardModel.initialize(sequelize);
TaskModel.initialize(sequelize);

// my assoc
UserModel.belongsToMany(RoleModel, { through: UserRoleModel, as: "roles", foreignKey: "userId" });
RoleModel.belongsToMany(UserModel, { through: UserRoleModel, as: "users", foreignKey: "roleId" });

RoleModel.belongsToMany(PermissionModel, { through: RolePermissionModel, as: "permissions", foreignKey: "roleId" });
PermissionModel.belongsToMany(RoleModel, { through: RolePermissionModel, as: "roles", foreignKey: "permissionId" });

RefreshTokenModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
UserModel.hasMany(RefreshTokenModel, { foreignKey: "userId", as: "refreshTokens" });

//Todo
ProjectModel.belongsToMany(UserModel, { through: ProjectUserModel, foreignKey: "projectId", as: "members" });
UserModel.belongsToMany(ProjectModel, { through: ProjectUserModel, foreignKey: "userId", as: "projects" });

ProjectModel.hasMany(BoardModel, { foreignKey: "projectId", as: "boards" });
BoardModel.belongsTo(ProjectModel, { foreignKey: "projectId", as: "project" });

BoardModel.hasMany(TaskModel, { foreignKey: "boardId", as: "tasks" });
TaskModel.belongsTo(BoardModel, { foreignKey: "boardId", as: "board" });
TaskModel.belongsTo(BoardModel, { foreignKey: "boardId", onDelete: "CASCADE" });

TaskModel.belongsToMany(UserModel, { through: TaskAssignmentModel, as: "assignees", foreignKey: "taskId" });
UserModel.belongsToMany(TaskModel, { through: TaskAssignmentModel, as: "tasks", foreignKey: "userId" });

// Export
export {
  sequelize,
  UserModel,
  RoleModel,
  PermissionModel,
  UserRoleModel,
  RolePermissionModel,
  RefreshTokenModel,
  ProjectModel,
  BoardModel,
  TaskModel,
  ProjectUserModel,
  TaskAssignmentModel
}

export * from './PermissionModel';
export * from './RoleModel';
export * from './RolePermissionModel';
export * from './UserModel';
export * from './UserRoleModel';
export * from './RefreshTokenModel';
export * from './AuditLogModel';
export * from './ActivityModel';
export * from './BoardModel';
export * from './ProjectModel';
export * from './ProjectUserModel';
export * from './TaskAssignmentModel';
export * from './TaskModel';