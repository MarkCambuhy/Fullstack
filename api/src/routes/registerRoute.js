import { Router } from "express";
import registerController from "../controllers/registerController.js";
import { morganMiddleware } from "../middlewares/logs.js";

const routes = new Router();

routes.post("/", morganMiddleware, registerController.register);

export default routes;
