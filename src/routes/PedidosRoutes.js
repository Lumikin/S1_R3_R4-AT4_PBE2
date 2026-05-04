import { Router } from "express";
import pedidosController from "../controllers/pedidosControllers.js";

const pedidosRoutes = Router();

pedidosRoutes.get("/", pedidosController.selecionar);
pedidosRoutes.post("/", pedidosController.criar);
pedidosRoutes.get("/:id", pedidosController.selecionarId)
pedidosRoutes.put("/:idPedido",pedidosController.atualizarPedido)
// --- Itens --- //
pedidosRoutes.get("/Item", pedidosController.selecionarItens);
pedidosRoutes.put("/Item", pedidosController.atualizarPedido);
pedidosRoutes.post("/Item/:idPedido", pedidosController.criarItem);

export default pedidosRoutes;
