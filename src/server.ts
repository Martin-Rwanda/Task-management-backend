import app from "./app";
import { sequelize } from "./infrastructure";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
        if (process.env.NODE_ENV !== "production") {
            await sequelize.sync({ alter: true });
        }
        console.log("Models synced.");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Server failed to start", err);
        process.exit(1);
    }
}

startServer();