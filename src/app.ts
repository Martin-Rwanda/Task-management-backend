import express from "express";
import bodyParser from "body-parser";
import { userRoutes } from "./presentation/routes/user.routes";
import { authRoutes } from "./presentation/routes/auth.routes";
import { roleRoutes } from "./presentation/routes/role.routes";
import { permissionRoutes } from "./presentation/routes/Permission.route";
import { activityRoutes } from "./presentation/routes/activity.routes";
import { boardRoutes } from "./presentation/routes/board.routes";
import { projectRouter } from "./presentation/routes/project.routes";
import { projectUserRouter } from "./presentation/routes/projectUser.routes";
import { taskRouter } from "./presentation/routes/task.routes";
import { taskAssignmentRouter } from "./presentation/routes/taskAssignment.routes";

import { GlobalErrorHandler } from "./shared/errors/GlobalErrorHandler";

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/projects", projectRouter);
app.use("/api/project/user", projectUserRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/task/asssignment", taskAssignmentRouter)
app.use(GlobalErrorHandler)


export default app;