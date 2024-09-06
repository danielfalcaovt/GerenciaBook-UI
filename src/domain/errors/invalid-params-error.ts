export class InvalidParamsError extends Error {
  constructor() {
    super('Parâmetros Inválidos.')
    this.name = 'InvalidParamsError'
  }
}
