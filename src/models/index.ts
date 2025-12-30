import { sequelize } from "../infrastructure/database/sequelizer";
import { UserModel } from "../infrastructure";
import { RoleModel } from "../infrastructure";
import { PermissionModel } from "../infrastructure";
import { UserRoleModel } from "../infrastructure";
import { RolePermissionModel } from "../infrastructure";
import { RefreshTokenModel } from "../infrastructure";


UserModel.initialize(sequelize);
RoleModel.initialize(sequelize);
PermissionModel.initialize(sequelize);
UserRoleModel.initialize(sequelize);
RolePermissionModel.initialize(sequelize);
RefreshTokenModel.initialize(sequelize);


UserModel.belongsToMany(RoleModel, { through: UserRoleModel, as: "roles", foreignKey: "userId" });
RoleModel.belongsToMany(UserModel, { through: UserRoleModel, as: "users", foreignKey: "roleId" });

RoleModel.belongsToMany(PermissionModel, { through: RolePermissionModel, as: "permissions", foreignKey: "roleId" });
PermissionModel.belongsToMany(RoleModel, { through: RolePermissionModel, as: "roles", foreignKey: "permissionId" });

RefreshTokenModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
UserModel.hasMany(RefreshTokenModel, { foreignKey: "userId", as: "refreshTokens" });

// Export
export {
  sequelize,
  UserModel,
  RoleModel,
  PermissionModel,
  UserRoleModel,
  RolePermissionModel,
  RefreshTokenModel,
}