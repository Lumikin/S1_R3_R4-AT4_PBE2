export class Pedido {
  #id;
  #clienteId;
  #subtotal;
  #status;
  #dataCad;

  // Contructor //
  constructor(pCliente, pSubTotal, pStatus, pID) {
    this.#clienteId = pCliente;
    this.#subtotal = pSubTotal;
    this.#status = pStatus;
    this.#id = pID;
  }
  // Getters //
  get id() {
    return this.#id;
  }
  get clienteId() {
    return this.#clienteId;
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

  // Setters //
  set id(value) {
    this.validarId(value);
    return (this.#id = value);
  }

  set clienteId(value) {
    this.validarClienteId(value);
    return (this.#clienteId = value);
  }
  set subTotal(value) {
    this.validarSubTotal(value);
    return (this.#subtotal = value);
  }
  set status(value) {
    this.validarStatus(value);
    return (this.#id = value);
  }
  // Métodos auxiliares //
  #validarId(value) {
    if (!value && value < 0) {
      throw new Error("Verifique o ID informado");
    }
  }

  #validarClienteId(value) {
    if (!value && value < 0) {
      throw new Error("Verifique o ID informado");
    }
  }

  #validarSubTotal(value) {
    if (!value || value <= 0) {
      throw new Error("Não foi possivel obter o subtotal");
    }
  }

  //Desing Pattern
  static criar(dados) {
    return new Pedido(dados.clienteId, dados.subtotal, dados.status, null);
  }
  static editar(dados, id) {
    return new Pedido(dados.clienteId, dados.subtotal, dados.status, id);
  }
}
