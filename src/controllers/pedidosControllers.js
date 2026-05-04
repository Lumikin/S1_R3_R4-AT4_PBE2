// Imports
import pedidoRepositories from "../repositories/pedidoRepository.js";
import { Pedido } from "../models/Pedido.js";
import { ItensPedido } from "../models/Itens_Pedido.js";
import { statusPedido } from "../enum/statusPedido.js";
const pedidosController = {
  selecionar: async (req, res) => {
    try {
      const result = await pedidoRepositories.getPedido();
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Essa tabela não contem registros",
        });
      }
      res.status(201).json({
        Message: "Pedidos encontrados!",
        Data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  selecionarItens: async (req, res) => {
    try {
      const result = await pedidoRepositories.getItem();
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Essa tabela não contem registros",
        });
      }
      res.status(201).json({
        Message: "Itens encontrados!",
        Data: result,
      });
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
      const result = await pedidoRepositories.getPedidoId(id);
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
      const { ClienteId, itens } = req.body;
      console.log(req.body);

      const itensPedido = itens.map(item => {
        console.log("Itens:", item);
        return ItensPedido.criar({
          produtoId: item.ProdutoId,
          quantidade: item.quantidade,
          valorItem: item.valorItem,
        });
      });
      console.log("aaaa", itensPedido);
      const subTotalItens = ItensPedido.calcularSubTotal(itensPedido);
      const pedido = Pedido.criar({
        ClienteId,
        status: statusPedido.ABERTO,
        subTotalItens,
      });
      const result = await pedidoRepositories.criar(pedido, itensPedido);
      console.log(result);
      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        Error: error.message,
      });
    }
  },
  criarItem: async (req, res) => {
    try {
      const { itens, ClienteId } = req.body;
      const idPedido = Number(req.params.idPedido);

      if (!idPedido) {
        return res.status(400).json({
          message: "É necessário informar o idPedido",
        });
      }

      const itensPedido = itens.map(item => {
        console.log("Itens", item);
        return ItensPedido.criar({
          pedidoId: idPedido,
          produtoId: item.ProdutoId,
          quantidade: item.quantidade,
          valorItem: item.valorItem,
        });
      });

      console.log("Itens Pedido", itensPedido);

      const result = await pedidoRepositories.criarItem(idPedido, itensPedido);

      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        Error: error.message,
      });
    }
  },
  atualizarPedido: async (req, res) => {
    try {
      const idPedido = Number(req.query.id);
      const { status } = req.body;

      if (!idPedido || isNaN(idPedido)) {
        return res
          .status(400)
          .json({ message: "ID não capturado corretamente na URL" });
      }
      const pedidoEditado = Pedido.editar(status, idPedido);

      const result = await pedidoRepositories.alterarPedido(pedidoEditado);

      if (result.affectedRows === 0) {
        throw new Error("Pedido não encontrado para atualização.");
      }
      return res.status(200).json({
        message: "Pedido atualizado com sucesso!",
        result,
      });
    } catch (error) {
      console.error(error); // console.error é melhor para erros
      res.status(500).json({
        message: "Ocorreu um erro no servidor ao alterar o pedido",
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
