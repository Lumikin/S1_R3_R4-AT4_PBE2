import { Router } from "express";
import categoriaRoutes from "./categoriaRoutes.js";
import produtoRoutes from "./produtosRoutes.js";
import clienteRoutes from "./clienteRoutes.js";
import pedidosRoutes from "./PedidosRoutes.js";

const routes = Router();

routes.use("/categorias", categoriaRoutes);
routes.use("/produtos", produtoRoutes);
routes.use("/clientes", clienteRoutes);
routes.use("/pedidos", pedidosRoutes);

export default routes;
