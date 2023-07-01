import { Router } from "express";
import userController from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { morganMiddleware } from "../middlewares/logs.js";

const routes = new Router();

routes.get("/:id", verifyToken, morganMiddleware, userController.getUser);
routes.put("/:id", verifyToken, morganMiddleware, userController.updateUser);
routes.delete("/:id", verifyToken, morganMiddleware, userController.deleteUser);

export default routes;
