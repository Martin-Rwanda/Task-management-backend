# Task Management Backend

[![CircleCI](https://circleci.com/gh/Martin-Rwanda/Task-management-backend.svg?style=shield)](https://circleci.com/gh/Martin-Rwanda/Task-management-backend)

[![Coverage Status](https://coveralls.io/repos/github/Martin-Rwanda/Task-management-backend/badge.svg?branch=master)](https://coveralls.io/github/Martin-Rwanda/Task-management-backend?branch=master)

## Description
Backend API for Task Management application built with Node.js, Express, Sequelize, and PostgreSQL.

# Core dependencies
 - npm i express sequelize pg pg-hstore bcrypt jsonwebtoken dotenv cors
# Dev dependencies
 - npm i -D typescript@4.8.4 ts-node @types/node @types/express @types/bcrypt @types/jsonwebtoken nodemon
# Optional for logging
 - npm i winston

# Login test-tab
   - const json = pm.response.json();
    pm.environment.set("accessToken", json.accessToken);
    pm.environment.set("refreshToken", json.refreshToken);

# Refresh test-tab
    - pm.environment.set("accessToken", json.accessToken);
        if (json.refreshToken) {
            pm.environment.set("refreshToken", json.refreshToken);
        }

## db 
  - "migrate": "sequelize db:migrate",  // creates/updates tables in your database according to the migration files
  - "migrate:undo": "sequelize db:migrate:undo", //useful if you made a mistake and want to roll back the last change.
  - "migrate:undo:all": "sequelize db:migrate:undo:all" //wipes the database schema created by Sequelize migrations. Useful in development/testing.

  ## migr
    npx sequelize-cli migration:generate --name create-users
    npx sequelize-cli migration:generate --name create-roles
    npx sequelize-cli migration:generate --name create-permissions
    npx sequelize-cli migration:generate --name create-user-roles
    npx sequelize-cli migration:generate --name create-role-permissions
    npx sequelize-cli migration:generate --name create-refresh-tokens
    npx sequelize-cli db:migrate


    npx sequelize-cli db:drop      # drops the database
    npx sequelize-cli db:create    # creates the database again
    npx sequelize-cli db:migrate   # runs all migrations from scratch

USER_CREATE, USER_READ, USER_UPDATE, USER_DELETE

ROLE_CREATE, ROLE_READ, ROLE_UPDATE, ROLE_DELETE

TASK_CREATE, TASK_READ, TASK_UPDATE, TASK_DELETE


    npx ts-node src/test-db.ts

Difference between activity and audit

// Activity (user-facing)
await activityService.log(
  userId,
  'DELETE_TASK',
  'Task',
  task.id
);
examples "Martin created task "Design API"
Martin moved task to "In Progress"
Martin commented on task"

❌ No public POST route

✅ Internal service calls

✅ Read routes (timeline)

// Audit (security)
await auditLogService.logAction({
  action: 'TASK_DELETED',
  performedBy: userId,
  targetType: 'Task',
  targetId: task.id,
  details: { hardDelete: false }
});

exapmles  "Admin changed user role from USER → MANAGER
User login failed (IP: x.x.x.x)
Password reset requested
Task deleted (hard delete)"

❌ No routes at all for writing

✅ Admin-only read access

❌ Never exposed to frontend users


# Show structure 
  - tree -I 'node_modules|coverage'