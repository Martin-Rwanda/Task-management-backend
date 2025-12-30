import { Model, DataTypes, Sequelize } from "sequelize";

export class PermissionModel extends Model {
    declare id: string;
    declare name: string;
    declare description?: string;

    static initialize(sequelize: Sequelize) {
        PermissionModel.init(
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
                sequelize, tableName: "permissions",
            }
        )
    }
}