import { UserModel } from "./models";
import { RoleModel } from "./models";
import { PermissionModel } from "./models";
import { UserRoleModel } from "./models";
import { RolePermissionModel } from "./models";
import { RefreshTokenModel } from "./models/RefreshTokenModel";

UserModel.belongsToMany(RoleModel, {
    through: UserRoleModel,
    as: "roles",
    foreignKey: "userId",
})
RoleModel.belongsToMany(UserModel, {
    through: UserRoleModel,
    as: "users",
    foreignKey: "roleId"
})

RoleModel.belongsToMany(PermissionModel, {
    through: RolePermissionModel,
    as: "permissions",
    foreignKey: "roleId",
})
PermissionModel.belongsToMany(RoleModel, {
    through: RolePermissionModel,
    as: "roles",
    foreignKey: "permissionId"
})

RefreshTokenModel.belongsTo(UserModel, { 
    foreignKey: "userId", 
    as: "user" });
UserModel.hasMany(RefreshTokenModel, { 
    foreignKey: "userId", 
    as: "refreshTokens" });