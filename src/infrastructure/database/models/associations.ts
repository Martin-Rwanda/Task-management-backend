import { UserModel } from "./UserModel";
import { RoleModel } from "./RoleModel";
import { PermissionModel } from "./PermissionModel";
import { UserRoleModel } from "./UserRoleModel";
import { RolePermissionModel } from "./RolePermissionModel";

UserModel.belongsToMany(RoleModel, {
    through: UserRoleModel,
    foreignKey: "userId",
})
RoleModel.belongsToMany(UserModel, {
    through: UserRoleModel,
    foreignKey: "roleId"
})

RoleModel.belongsToMany(PermissionModel, {
    through: RolePermissionModel,
    foreignKey: "roleId"
})
PermissionModel.belongsToMany(RoleModel, {
    through: RolePermissionModel,
    foreignKey: "permissionId"
})
