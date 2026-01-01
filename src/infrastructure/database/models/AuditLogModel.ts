import { Model, DataTypes, Sequelize } from "sequelize";


export class AuditLogModel extends Model {
    declare id: string;
    declare action: string;
    declare performedBy: string;
    declare targetType: string;
    declare targetId: string;
    declare details?: string;

    static initialize(sequelize: Sequelize) {
        AuditLogModel.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },

                action: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                performedBy: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },

                targetType: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                targetId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },

                details: {
                    type: DataTypes.JSONB,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "audit_logs",
                timestamps: true,
                updatedAt: false, 
            }
        )
    }
}