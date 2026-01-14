import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { sequelize } from '../src/infrastructure/database/sequelizer';
import { UserModel, RoleModel, UserRoleModel, PermissionModel, RolePermissionModel } from '../src/infrastructure/database/models';

export const seedAdmin = async () => {
  const t = await sequelize.transaction();
  try {

    let adminRole = await RoleModel.findOne({ where: { name: 'admin' }, transaction: t });
    if (!adminRole) {
      adminRole = await RoleModel.create({
        id: uuidv4(),
        name: 'admin',
        description: 'Administrator with full permissions',
      }, { transaction: t });
    }

    let adminUser = await UserModel.findOne({ where: { email: 'admin@test.com' }, transaction: t });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      adminUser = await UserModel.create({
        id: uuidv4(),
        name: 'Admin User',
        email: 'admin@test.com',
        password: hashedPassword,
        isActive: true,
      }, { transaction: t });
    }

    const userRole = await UserRoleModel.findOne({
      where: { userId: adminUser.id, roleId: adminRole.id },
      transaction: t
    });

    if (!userRole) {
      await UserRoleModel.create({
        userId: adminUser.id,
        roleId: adminRole.id,
      }, { transaction: t });
    }

    const allPermissions = await PermissionModel.findAll({ transaction: t });
    for (const perm of allPermissions) {
      const rolePerm = await RolePermissionModel.findOne({
        where: { roleId: adminRole.id, permissionId: perm.id },
        transaction: t
      });
      if (!rolePerm) {
        await RolePermissionModel.create({
          roleId: adminRole.id,
          permissionId: perm.id,
        }, { transaction: t });
      }
    }

    await t.commit();
    console.log('Admin user seeded successfully');
  } catch (error) {
    await t.rollback();
    console.error('Failed to seed admin user:', error);
  }
};