import { Router } from "express";
import postController from "../controllers/postController.js";
import verifyToken from "../middlewares/verifyToken.js";

const routes = new Router();

routes.get("/", verifyToken, postController.getPosts);
routes.post("/", verifyToken, postController.criarPost);

export default routes;
