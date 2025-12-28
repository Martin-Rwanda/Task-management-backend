import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

export class UserRoleModel extends Model {
    declare userId: string;
    declare roleId: string;
}

UserRoleModel.init(
    {
        userId: {
            type:DataTypes.UUID,
            allowNull: false
        },
        roleId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    },
    {
        sequelize, tableName: "user_roles",
    }
)