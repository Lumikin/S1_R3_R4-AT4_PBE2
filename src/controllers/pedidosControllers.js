// Imports
import pedidoRepositories from "../repositories/pedidoRepository.js";
import { Pedido } from "../models/Pedido.js";
import { ItensPedido } from "../models/Itens_Pedido.js";
import { statusPedido } from "../enum/statusPedido.js";
const pedidosController = {
  selecionar: async (req, res) => {
    try {
      const result = await clientesRepositories.get();
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Essa tabela não contem registros",
        });
      }
      res.status(201).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  selecionarId: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await clientesRepositories.getId(id);
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Esse ID não contem registro!",
        });
      }
      res.status(201).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },

  criar: async (req, res) => {
    try {
      const { clienteId, itens } = req.body;
      const itensPedido = itens.map(item => {
        console.log("Itens:", item);
        ItensPedido.criar({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          valorItem: item.valorItem,
        });
      });
      console.log(itensPedido);
      const subTotalItens = ItensPedido.calcularSubTotal(itensPedido); //Cria metedo para calcular
      const pedido = Pedido.criar({
        clienteId,
        subTotalItens,
        status: statusPedido.ABERTO,
      });

      const result = await pedidoRepositories.post(pedido, itensPedido);
      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        Error: error.message,
      });
    }
  },
  atualizar: async (req, res) => {
    try {
      const id = Number(req.query.id);
      const { nome, valor, idCategoria } = req.body;
      const produto = Produtos.editar({ nome, valor, idCategoria }, id);
      const result = await produtoRepository.editar(produto);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  deletar: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await produtoRepository.deletar(id);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
};

export default pedidosController;
