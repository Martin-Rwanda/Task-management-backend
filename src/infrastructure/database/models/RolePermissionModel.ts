import { Model, DataTypes, Sequelize } from "sequelize";

export class RolePermissionModel extends Model {
  declare roleId: string;
  declare permissionId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date;

  static initialize(sequelize: Sequelize) {
    RolePermissionModel.init(
      {
        roleId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "roles", key: "id" },
          onDelete: "CASCADE"
        },
        permissionId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "permissions", key: "id" },
          onDelete: "CASCADE"
        }
      },
      {
        sequelize,
        tableName: "role_permissions",
        timestamps: true,
        paranoid: true,
        indexes: [
          { fields: ["roleId"] },
          { fields: ["permissionId"] },
          { fields: ["roleId", "permissionId"], unique: true }
        ],
      }
    );

  }
}