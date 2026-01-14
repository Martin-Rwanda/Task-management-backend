import { Model, DataTypes, Sequelize } from "sequelize";

export class TaskAssignmentModel extends Model {
    declare taskId: string;
    declare userId: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt?: Date;

    static initialize(sequelize: Sequelize) {
        TaskAssignmentModel.init(
            {
                taskId: {
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
                tableName: "task_assignments",
                timestamps: true,
                paranoid: true
            }
        );
    }
}