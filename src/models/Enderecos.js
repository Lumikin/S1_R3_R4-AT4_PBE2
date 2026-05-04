export class Enderecos {
  #id;
  #clienteId;
  #cep;
  #logradouro;
  #bairro;
  #complemento;
  #numeroCasa;
  #uf;
  #localidade;
  //#dataCad

  constructor(
    cep,
    logradouro,
    numeroCasa,
    complemento,
    bairro,
    localidade,
    uf,
    clienteId,
    id,
  ) {
    this.#cep = cep;
    this.#logradouro = logradouro;
    this.#numeroCasa = numeroCasa;
    this.#complemento = complemento;
    this.#bairro = bairro;
    this.#localidade = localidade;
    this.#uf = uf;
    this.#clienteId = clienteId;
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#validarId(value);
    this.#id = value;
  }

  get clienteId() {
    return this.#clienteId;
  }

  set clienteId(value) {
    this.#validarId(value);
    this.#clienteId = value;
  }

  get cep() {
    return this.#cep;
  }

  set cep(value) {
    this.#validarCep(value);
    this.#cep = value;
  }

  get bairro() {
    return this.#bairro;
  }
  set bairro(value) {
    this.#bairro = value;
  }

  get logradouro() {
    return this.#logradouro;
  }
  set logradouro(value) {
    this.#logradouro = value;
  }

  get complemento() {
    return this.#complemento;
  }
  set complemento(value) {
    this.#complemento = value;
  }

  get localidade() {
    return this.#localidade;
  }
  set localidade(value) {
    this.#localidade = value;
  }

  get uf() {
    return this.#uf;
  }
  set uf(value) {
    this.#uf = value;
  }
  get numeroCasa() {
    return this.#numeroCasa;
  }
  set numeroCasa(value) {
    this.#numeroCasa = value;
  }
  // --- Validação --- //

  #validarCep(value) {
    if (!value || isNaN(value) || value.trim() <= 0) {
      throw new Error("Digite um CEP válido");
    }
  }

  #validarId(value) {
    if (isNaN(value) || value.trim() <= 0) {
      throw new Error("O id deve ser válido");
    }
  }

  static criar(dados) {
    return new Enderecos(
      dados.cep,
      dados.logradouro,
      dados.numeroCasa,
      dados.complemento,
      dados.bairro,
      dados.localidade,
      dados.uf,
      null,
      null,
    );
  }
}
