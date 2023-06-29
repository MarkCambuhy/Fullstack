import { Router } from "express";
import authController from "../controllers/authController.js";

const routes = new Router();

routes.post("/", authController.login);
routes.post("/register", authController.register);

export default routes;
