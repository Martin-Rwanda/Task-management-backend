import dotenv from "dotenv";
dotenv.config();

import { 
  sequelize,
  UserModel,
  RoleModel,
  PermissionModel,
  UserRoleModel,
  RolePermissionModel, 
} from "./infrastructure";


import bcrypt from "bcryptjs";

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    // ----- Define roles -----
    const roles = ["admin", "manager", "user"];
    const roleRecords: Record<string, any> = {};

    for (const roleName of roles) {
      let role = await RoleModel.findOne({ where: { name: roleName } });
      if (!role) role = await RoleModel.create({ name: roleName });
      roleRecords[roleName] = role;
    }

    // ----- Define resource-based permissions -----
    const permissionList = [
      "USER_CREATE", "USER_READ", "USER_UPDATE", "USER_DELETE", "USER_VIEWS",
      "ROLE_CREATE", "ROLE_READ", "ROLE_UPDATE", "ROLE_DELETE", "ROLE_VIEWS",
      "TASK_CREATE", "TASK_READ", "TASK_UPDATE", "TASK_DELETE", "TASK_VIEWS",
    ];
    const permissionRecords: Record<string, any> = {};

    for (const permName of permissionList) {
      let perm = await PermissionModel.findOne({ where: { name: permName } });
      if (!perm) perm = await PermissionModel.create({ name: permName });
      permissionRecords[permName] = perm;
    }

    // ----- Assign permissions to roles -----
    // Admin gets all
    for (const perm of Object.values(permissionRecords)) {
      await RolePermissionModel.findOrCreate({
        where: {
          roleId: roleRecords["admin"].id,
          permissionId: perm.id,
        },
      });
    }

    // Manager example: only TASK_* permissions
    for (const permName of Object.keys(permissionRecords).filter(p => p.startsWith("TASK"))) {
      await RolePermissionModel.findOrCreate({
        where: {
          roleId: roleRecords["manager"].id,
          permissionId: permissionRecords[permName].id,
        },
      });
    }

    // User example: only TASK_READ and USER_UPDATE (own profile)
    const userPerms = ["TASK_READ", "USER_UPDATE"];
    for (const permName of userPerms) {
      await RolePermissionModel.findOrCreate({
        where: {
          roleId: roleRecords["user"].id,
          permissionId: permissionRecords[permName].id,
        },
      });
    }

    console.log("✅ Roles and permissions setup completed..");

    // ----- Create admin user -----
    const adminEmail = "ntezijmartin25@gmail.com";

    await UserModel.destroy({ where: { email: adminEmail }, force: true });

    const hashedPassword = await bcrypt.hash("02011997@", 12);

    const admin = await UserModel.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      isActive: true,
    });

    await UserRoleModel.create({
      userId: admin.id,
      roleId: roleRecords["admin"].id,
    });

    console.log("✅ Admin user created with admin role:", admin.toJSON());

  } catch (error) {
    console.error("❌ Bootstrap error:", error);
  } finally {
    await sequelize.close();
    console.log("Connection closed. Delete this file after use!");
  }
}

bootstrap();


// import { sequelize } from './models'; // adjust path
// import RoleModel from './models/role.model';
// import PermissionModel from './models/permission.model';
// import UserModel from './models/user.model';
// import bcrypt from 'bcryptjs';
// import { v4 as uuid } from 'uuid';

// async function bootstrap() {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Database connected!');

//     // Roles
//     const roles = ['admin', 'manager', 'user'];
//     const roleRecords: Record<string, any> = {};
//     for (const name of roles) {
//       const [role] = await RoleModel.findOrCreate({
//         where: { name },
//         defaults: { id: uuid(), name },
//       });
//       roleRecords[name] = role;
//     }

//     // Permissions
//     const permissions = [
//       'USER_CREATE', 'USER_READ', 'USER_UPDATE', 'USER_DELETE', 'USER_VIEWS',
//       'ROLE_CREATE', 'ROLE_READ', 'ROLE_UPDATE', 'ROLE_DELETE', 'ROLE_VIEWS',
//       'TASK_CREATE', 'TASK_READ', 'TASK_UPDATE', 'TASK_DELETE', 'TASK_VIEWS',
//     ];
//     const permRecords: Record<string, any> = {};
//     for (const name of permissions) {
//       const [perm] = await PermissionModel.findOrCreate({
//         where: { name },
//         defaults: { id: uuid(), name },
//       });
//       permRecords[name] = perm;
//     }

//     // Assign all permissions to admin
//     const adminRole = roleRecords['admin'];
//     for (const perm of Object.values(permRecords)) {
//       await adminRole.$add('permissions', perm); // Sequelize handles duplicates
//     }

//     // Admin user
//     const adminPassword = await bcrypt.hash('Admin@123', 12);
//     await UserModel.findOrCreate({
//       where: { email: 'admin@example.com' },
//       defaults: {
//         id: uuid(),
//         username: 'admin',
//         email: 'admin@example.com',
//         password: adminPassword,
//         roleId: adminRole.id,
//       },
//     });

//     console.log('✅ Bootstrap finished!');
//   } catch (err) {
//     console.error('❌ Bootstrap failed:', err);
//   } finally {
//     await sequelize.close();
//   }
// }

// bootstrap();
