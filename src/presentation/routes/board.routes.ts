import { Router } from "express";
import { BoardController } from "../controllers/Board.controller";
import { boardService } from "../../shared";
import { AuthMiddleware } from "../../shared";

const boardRoutes = Router();
const controller = new BoardController(boardService);

boardRoutes.post("/", AuthMiddleware, controller.create);
boardRoutes.get("/", AuthMiddleware, controller.listByProject);
boardRoutes.get("/:id", AuthMiddleware, controller.getById);

export { boardRoutes };
