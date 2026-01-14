import { Model, DataTypes, Sequelize } from "sequelize";

export class BoardModel extends Model {
    declare id: string;
    declare name: string;
    declare projectId: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt?: Date;

    static initialize(sequelize: Sequelize) {
        BoardModel.init(
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
                projectId: {
                    type: DataTypes.UUID,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: "boards",
                timestamps: true,
                paranoid: true
            }
        );
    }
}