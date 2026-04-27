export class ItensPedido {
  #id;
  #pedidoId;
  #produtoId;
  #quantidade;
  #valorItem;

  // Contructor //
  constructor(pPedidoId, pProdutoId, pQuantidade, pValorItem, pID) {
    this.#pedidoId = pPedidoId;
    this.#produtoId = pProdutoId;
    this.#quantidade = pQuantidade;
    this.#valorItem = pValorItem;
    this.#id = pID;
  }
  // Getters //
  get id() {
    return this.#id;
  }
  get pedidoId() {
    return this.#pedidoId;
  }
  get produtoId() {
    return this.#produtoId;
  }
  get quantidade() {
    return this.#quantidade;
  }
  get valorItem() {
    return this.#quantidade;
  }

  // Setters //
  set id(value) {
    this.#validarId(value);
    return (this.#id = value);
  }

  set pedidoId(value) {
    this.#validarPedidoId(value);
    return (this.#pedidoId = value);
  }
  set produtoId(value) {
    this.validarprodutoId(value);
    return (this.#produtoId = value);
  }
  set quantidade(value) {
    this.validarquantidade(value);
    return (this.#id = value);
  }
  set valorItem(value) {
    this.validarquantidade(value);
    return (this.#id = value);
  }

  // Métodos auxiliares //

  #validarId(value) {
    if (!value && value < 0) {
      throw new Error("Verifique o ID informado");
    }
  }

  #validarPedidoId(value) {
    if (!value || value <= 0) {
      throw new Error("Verifique o ID do produto informado");
    }
  }

  #validarProdutoId(value) {
    if (!value || value <= 0) {
      throw new Error("Verifique o ID do produto informado");
    }
  }

  #validarSubTotal(value) {
    if (!value || value <= 0) {
      throw new Error("Não foi possivel obter o subtotal");
    }
  }
  #validarValorItem(value) {
    if (!value || value <= 0) {
      throw new Error("Infomre um valor para o item");
    }
  }

  static calcularSubTotal(itens) {
    return (itens.reduce(
      (total, item) => total + (item.valorItem * item.quantidade),0
    ));
  }

  //Desing Pattern
  static criar(dados) {
    return new ItensPedido(
      dados.pedidoId,
      dados.produtoId,
      dados.quantidade,
      dados.valorItem,
      null,
    );
  }
  static editar(dados, id) {
    return new ItensPedido(
      dados.pedidoId,
      dados.produtoId,
      dados.quantidade,
      dados.valorItem,
      id,
    );
  }
}
