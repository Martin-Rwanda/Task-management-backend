import { Model, DataTypes, Sequelize } from "sequelize";

export class ProjectModel extends Model {
    declare id: string;
    declare name: string;
    declare ownerId: string;
    declare description?: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt?: Date;

    static initialize(sequelize: Sequelize) {
        ProjectModel.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                ownerId: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true
                }
            },
            {
                sequelize,
                tableName: "projects",
                timestamps: true,
                paranoid: true
            }
        );
    }
}
