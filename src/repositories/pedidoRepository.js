import { connection } from "../config/Database.js";

const pedidoRepositories = {
  criar: async (pedido, itemPed) => {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      const sqlPedido =
        "INSERT INTO pedidos (ClienteID, Subtotal, Status) VALUES (?,?,?);";

      // Chamando os Getters minúsculos definidos na classe acima
      const valuesPedido = [pedido.ClienteId, pedido.subTotal, pedido.status];

      const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

      const sqlItemPed =
        "INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?,?,?,?);";

      // IMPORTANTE: Use for...of para operações assíncronas em banco
      for (const item of itemPed) {
        const valuesItemPed = [
          rowsPedido.insertId, // ID do pedido que acabou de ser criado
          item.produtoId,
          item.quantidade,
          item.valorItem,
        ];
        await conn.execute(sqlItemPed, valuesItemPed);
      }

      await conn.commit();
      return { rowsPedido };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },
  criarItem: async (idPedido, itensPedido) => {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();
      // --- 1. Criar Item --- //

      const sqlItemPed =
        "INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?,?,?,?);";
      for (const item of itensPedido) {
        // --- Para cada item preencher: --- //
        const valuesItemPed = [
          idPedido,
          item.produtoId,
          item.quantidade,
          item.valorItem,
        ];
        await conn.execute(sqlItemPed, valuesItemPed);
      }
      // --- SUM: qte * valor = novoSubTotal --- //

      const sqlSoma =
        "SELECT SUM(Quantidade * ValorItem) as novoSubTotal FROM itens_pedidos WHERE PedidoId = ?;";
      const [rowsSoma] = await conn.execute(sqlSoma, [idPedido]);

      const novoSubTotal = rowsSoma[0].novoSubTotal;

      // --- 3. ATUALIZAR O PEDIDO: novoSubTotal => SubTotal --- //
      
      const sqlUpdatePedido = "UPDATE pedidos SET Subtotal = ? WHERE id = ?;";
      const valuesUpdate = [novoSubTotal, idPedido];
      await conn.execute(sqlUpdatePedido, valuesUpdate);

      await conn.commit();

      return {
        message: "Itens adicionados e subtotal atualizado com sucesso!",
        idPedido,
        novoSubTotal,
      };
    } catch (error) {
      await conn.rollback();
      console.error("Erro ao adicionar itens:", error);
      throw error;
    } finally {
      conn.release();
    }
  },

  alterarItem: async (idPedido, itensPedido) => {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      const sqlUpdateItem =
        "UPDATE itens_pedidos SET ProdutoId = ?, Quantidade = ?, ValorItem = ? WHERE id = ? AND PedidoId = ?;";

      for (const item of dadosPedido.itens) {
        await conn.execute(sqlUpdateItem, [
          item.produtoId,
          item.quantidade,
          item.valorItem,
          item.id,
          dadosPedido.idPedido,
        ]);
      }

      // 2. Busca a soma atualizada
      const sqlSoma =
        "SELECT SUM(Quantidade * ValorItem) as novoSubTotal FROM itens_pedidos WHERE PedidoId = ?;";
      const [rowsSoma] = await conn.execute(sqlSoma, [dadosPedido.idPedido]);
      const novoSubTotal = rowsSoma[0].novoSubTotal;

      // 3. Atualiza o subtotal no pedido principal
      const sqlUpdatePedido = "UPDATE pedidos SET Subtotal = ? WHERE id = ?;";
      await conn.execute(sqlUpdatePedido, [novoSubTotal, dadosPedido.idPedido]);

      await conn.commit();
      return { idPedido: dadosPedido.idPedido, novoSubTotal };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },
  get: async () => {
    const sql = "SELECT * FROM pedidos";
    const [rows] = await connection.execute(sql);
    return rows;
  },

  getId: async id => {
    const sql = "";
    const value = [id];
    const [rows] = await connection.execute(sql, value);
    return rows;
  },

  deletar: async id => {
    const sql = "DELETE FROM categorias WHERE id=?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },
};

export default pedidoRepositories;
