import { connection } from "../config/Database.js";

const pedidoRepositories = {
  post: async (pedido, itemPed) => {
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
  put: async categoria => {
    const sql = "UPDATE categorias SET Nome=?, Descricao=? WHERE id=?;";
    const values = [categoria.nome, categoria.descricao, categoria.id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  get: async () => {
    const sql =
      "SELECT c.id, t.numero, e.cidade, e.cep, e.logradouro ,e.numero, e.complemento, e.bairro, e.cidade \
    FROM clientes AS c \
    INNER JOIN telefones AS t \
    ON c.Id = t.idCliente \
INNER JOiN enderecos AS e \
    ON c.Id = e.idCliente";
    const [rows] = await connection.execute(sql);
    return rows;
  },

  getId: async id => {
    const sql =
      "SELECT c.id, t.numero, e.cidade, e.cep, e.logradouro ,e.numero, e.complemento, e.bairro, e.cidade \
    FROM clientes AS c \
    INNER JOIN telefones AS t \
    ON c.Id = t.idCliente \
INNER JOiN enderecos AS e \
    ON c.Id = e.idCliente\
  WHERE c.id = ?";
    const value = [id];
    const [rows] = await connection.execute(sql, value);
    return rows;
  },

  delete: async id => {
    const sql = "DELETE FROM categorias WHERE id=?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },
};

export default pedidoRepositories;
