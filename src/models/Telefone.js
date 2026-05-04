export class Telefone {
  #id;
  #idCliente;
  #numero;
  //#dataCad;

  constructor(numero, idCliente, id) {
    this.#numero = numero;
    this.#idCliente = idCliente;
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#validarId(value);
    this.#id = value;
  }

  get numero() {
    return this.#numero;
  }

  set numero(value) {
    this.#validarNumero(value);
    this.#numero = value;
  }

  get idCliente() {
    return this.#idCliente;
  }

  set idCliente(value) {
    this.#validarIdCliente(value);
    this.#idCliente = value;
  }

  // --- Validação --- //

  #validarId(value) {
    if (isNaN(value) || value.trim() <= 0) {
      throw new Error("O id deve ser válido");
    }
  }

  #validarIdCliente(value) {
    if (isNaN(value) || value.trim() <= 0) {
      throw new Error("O idCliente deve ser válido");
    }
  }

  #validarNumero(value) {
    if (isNaN(value) || value.trim() <= 0) {
      throw new Error("O Numero deve ser válido");
    }
  }

  // Design pattern: Factory

  static criar(dados) {
    console.log("Criar Telefone:", dados);
    return new Telefone(dados.numero, dados.idCliente, null);
  }

  static editar(dados, id) {
    return new Produtos(dados.telefones, dados.idCliente, id);
  }
}
