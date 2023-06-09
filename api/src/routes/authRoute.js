import { Router } from "express";
import authController from "../controllers/authController.js";
import { morganMiddleware } from "../middlewares/logs.js";

const routes = new Router();

routes.post("/", morganMiddleware, authController.login);

export default routes;
