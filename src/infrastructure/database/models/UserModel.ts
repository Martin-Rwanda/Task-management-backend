import { Model, DataTypes, Sequelize } from "sequelize";

export class UserModel extends Model {
    declare id: string;
    declare name: string;
    declare email: string;
    declare password: string;
    declare isActive: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt?: Date;

    static initialize(sequelize: Sequelize) {
        UserModel.init(
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
                email: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                isActive: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true
                } 
            },
            {
                sequelize, 
                tableName: "users",
                timestamps: true,
                paranoid: true
            }
        );
    }

}