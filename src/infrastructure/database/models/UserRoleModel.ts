import { Model, DataTypes, Sequelize } from "sequelize";

export class UserRoleModel extends Model {
  declare userId: string;
  declare roleId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;

  static initialize(sequelize: Sequelize) {
    UserRoleModel.init(
      {
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "users", key: "id" },
          onDelete: "CASCADE"
        },
        roleId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "roles", key: "id" },
          onDelete: "CASCADE"
        }
      },
      {
        sequelize,
        tableName: "user_roles",
        timestamps: true,
        paranoid: true,
        indexes: [
          { fields: ["userId"] },
          { fields: ["roleId"] },
          { fields: ["userId", "roleId"], unique: true } 
        ],
      }
    );
  }

}