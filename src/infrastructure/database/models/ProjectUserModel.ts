import { Model, DataTypes, Sequelize } from "sequelize";

export class ProjectUserModel extends Model {
    declare projectId: string;
    declare userId: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt?: Date;

    static initialize(sequelize: Sequelize) {
        ProjectUserModel.init(
            {
                projectId: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: "project_users",
                timestamps: true,
                paranoid: true
            }
        );
    }
}