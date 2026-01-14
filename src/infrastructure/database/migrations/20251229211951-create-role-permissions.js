'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_permissions', {
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "roles", key: "id" },
        onDelete: "CASCADE"
      },
      permissionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "permissions", key: "id" },
        onDelete: "CASCADE"
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
    await queryInterface.addConstraint('role_permissions', {
      fields: ['roleId', 'permissionId'],
      type: 'unique',
      name: 'role_permission_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_permissions');
  }
};