import { Model, DataTypes, Sequelize } from "sequelize";

export class TaskModel extends Model {
    declare id: string;
    declare title: string;
    declare description?: string;
    declare priority?: string;
    declare dueDate?: Date;
    declare boardId: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt?: Date;

    static initialize(sequelize: Sequelize) {
        TaskModel.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true
                },
                priority: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                dueDate: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                boardId: {
                    type: DataTypes.UUID,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: "tasks",
                timestamps: true,
                paranoid: true
            }
        );
    }
}