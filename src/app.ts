import express from "express";
import bodyParser from "body-parser";
import { userRoutes } from "./presentation/routes/user.routes";
import { authRoutes } from "./presentation/routes/auth.routes";
import { roleRoutes } from "./presentation/routes/role.routes";
import { permissionRoutes } from "./presentation/routes/Permission.route";
import { refreshRoutes } from "./presentation/routes/refresh.routes";
import { GlobalErrorHandler } from "./shared/errors/GlobalErrorHandler";

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/refresh", refreshRoutes);


export default app;