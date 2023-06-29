import { Router } from "express";
import userController from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const routes = new Router();

routes.get("/:id", verifyToken, userController.getUser);
routes.put("/:id", verifyToken, userController.updateUser);
routes.delete("/:id", verifyToken, userController.deleteUser);

export default routes;
