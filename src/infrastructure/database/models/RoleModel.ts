import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

export class RoleModel extends Model {
    declare id: string;
    declare name: string;
    declare description?: string;
}

RoleModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize, tableName: "roles",
    }
)