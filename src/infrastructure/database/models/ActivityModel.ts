import { Model, DataTypes, Sequelize } from "sequelize";

export class ActivityModel extends Model {
  declare id: string;
  declare userId: string;
  declare action: string;
  declare entity: string;
  declare entityId: string;
  declare createdAt: Date;
}

export const initActivityModel = (sequelize: Sequelize) => {
  ActivityModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      entity: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      entityId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "activities",
      timestamps: true,
      updatedAt: false, 
      paranoid: false, 
    }
  );
};