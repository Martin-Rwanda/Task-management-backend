import { Model, DataTypes, Sequelize } from "sequelize";

export class RefreshTokenModel extends Model {
    declare id: string;
    declare userId: string;
    declare token: string;
    declare expiresAt: Date;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt?: Date;

    static initialize(sequelize: Sequelize) {
        RefreshTokenModel.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: { model: "users", key: "id" },
                    onDelete: "CASCADE",
                },
                token: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    unique: true,
                },
                expiresAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: "refresh_tokens",
                timestamps: true,
                paranoid: true,
                indexes: [
                    { fields: ["userId"] },
                    { fields: ["token"], unique: true },
                ],
            }
        );
    } 
}