import { connection } from "../config/Database.js";

const pedidoRepositories = {
  post: async (pedido, itemPed) => {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      // --- insert Pedido --- //

      const sqlPedido =
        "INSERT INTO pedidos (ClienteID, Subtotal, Status) VALUES (?,?,?);";
      const valuesPedido = [pedido.clienteId, pedido.subTotal, pedido.Status];
      const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);
      console.log(valuesPedido);

      // --- insert itens_pedido --- //
      array.forEach(async element => {
        const sqlItemPed =
          "INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?,?,?,?);";
        const valuesItemPed = [rowsPedido.insertId,element.produtoId,element.quantidade,element.valorItem];
        await conn.execute(sqlItemPed, valuesItemPed);
      });

      await conn.commit();
      return { rowsPedido };
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
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
