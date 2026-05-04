import { Router } from "express";
import pedidosController from "../controllers/pedidosControllers.js";

const pedidosRoutes = Router();

pedidosRoutes.post("/", pedidosController.criar);

export default pedidosRoutes;
