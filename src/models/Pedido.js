export class Pedido {
  #id;
  #ClienteId;
  #subtotal;
  #status;
  #dataCad;

  // Constructor //
  constructor(pCliente, pSubTotal, pStatus, pID) {
    this.#ClienteId = pCliente;
    this.#subtotal = pSubTotal;
    this.#status = pStatus;
    this.#id = pID;
  }

  // Getters //
  get id() {
    return this.#id;
  }
  get ClienteId() {
    return this.#ClienteId;
  }
  get subTotal() {
    return this.#subtotal;
  }
  get status() {
    return this.#status;
  }
  get dataCad() {
    return this.#dataCad;
  }

  set id(value) {
    this.#validarId(value);
    this.#id = value;
  }
  set ClienteId(value) {
    this.#validarClienteId(value);
    this.#ClienteId = value;
  }
  set subTotal(value) {
    this.#validarSubTotal(value);
    this.#subtotal = value;
  }
  set status(value) {
    this.#validarStatus(value);
    this.#status = value;
  }

  #validarId(value) {
    if (!value || value < 0) {
      throw new Error("Verifique o ID informado");
    }
  }

  #validarClienteId(value) {
    if (!value || value <= 0) {
      throw new Error("Verifique o ID do cliente informado");
    }
  }

  #validarSubTotal(value) {
    if (!value || value <= 0) {
      throw new Error("Não foi possivel obter o subtotal");
    }
  }

  #validarStatus(value) {
    // Faltava esse método
    if (!value) {
      throw new Error("O status é obrigatório");
    }
  }

  // Design Pattern
  static criar(dados) {
    console.log("Dados do obj Pedido:", dados);
    return new Pedido(dados.ClienteId, dados.subTotalItens, dados.status, null);
  }

  static editar(dados, id) {
    return new Pedido(dados.ClienteId, dados.subtotal, dados.status, id);
  }
}
