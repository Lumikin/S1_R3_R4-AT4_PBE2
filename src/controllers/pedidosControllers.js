// Imports
import pedidoRepositories from "../repositories/pedidoRepository.js";
import { Pedido } from "../models/Pedido.js";
import { ItensPedido } from "../models/Itens_Pedido.js";
import { statusPedido } from "../enum/statusPedido.js";
const pedidosController = {
  selecionar: async (req, res) => {
    try {
      const result = await pedidoRepositories.get();
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
        subTotalItens,
        status: statusPedido.ABERTO,
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
      const { itens } = req.body;
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
      const idPedido = Number(req.query.id); // Pegando o ID da URL (?id=123)
      const { itensPedido } = req.body;

      // 1. Instancia/Estrutura os dados (seguindo seu padrão Produtos.editar)
      // Aqui você passa o array de itens e o ID do pedido pai
      const pedidoEditado = Pedido.editar(idPedido, itensPedido);

      // 2. Chama o Repository para fazer o trabalho pesado no banco
      const result = await pedidoRepositories.alterarItem(pedidoEditado);

      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
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
