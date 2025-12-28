import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

export class RolePermissionModel extends Model {
    declare roleId: string;
    declare permissionsId: string;
}

RolePermissionModel.init(
    {
        roleId: {
            type:DataTypes.UUID,
            allowNull: false
        },
        permissionId: {
            type:DataTypes.UUID,
            allowNull: false    
        }
    },
    {
        sequelize, tableName: "role_permissions",
    }
)