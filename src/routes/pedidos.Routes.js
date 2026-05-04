import { Router } from "express";
import pedidosController from "../controllers/pedidosControllers.js";

const pedidosRoutes = Router();

// clienteRoutes.get("/", clienteController.selecionar);
pedidosRoutes.post("/", pedidosController.criar);
// clienteRoutes.get("/:id", clienteController.selecionarId);
// clienteRoutes.get("/telefones", clienteController.selectTelefone);

export default pedidosRoutes;
