import { Router } from "express";
import pedidosController from "../controllers/pedidosControllers.js";

const pedidosRoutes = Router();

pedidosRoutes.get("/", pedidosController.selecionar);
pedidosRoutes.post("/", pedidosController.criar);
pedidosRoutes.put("/Item", pedidosController.atualizarPedido);
pedidosRoutes.post("/Item/:idPedido", pedidosController.criarItem);

export default pedidosRoutes;
