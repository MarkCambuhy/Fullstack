import { Router } from "express";
import postController from "../controllers/postController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { morganMiddleware } from "../middlewares/logs.js";

const routes = new Router();

routes.get("/", verifyToken, morganMiddleware, postController.getPosts);
routes.post("/", verifyToken, morganMiddleware, postController.criarPost);

export default routes;
