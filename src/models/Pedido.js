export class Pedido {
  #id;
  #ClienteId;
  #subtotal;
  #status;
  #dataCad;

  // Constructor //
  constructor(pCliente, pSubTotal, pStatus, id) {
    this.clienteId = pCliente;
    this.id = id; // Aqui ele chama o 'set id(valor)'
    this.status = pStatus;
    this.subtotal = pSubTotal;
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
    // this.#validarId(value);
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

  // #validarId(value) {
  //   if (!value || value < 0) {
  //     throw new Error("Verifique o ID informado");
  //   }
  // }

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
    return new Pedido(dados.ClienteId, dados.status, dados.subTotalItens, null);
  }

  static editar(pStatus, id) {
    return new Pedido(null, null, pStatus, id);
  }
}
