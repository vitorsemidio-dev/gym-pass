export class ResourceNotFoundError extends Error {
  constructor(msg = 'Resource not found') {
    super(msg)
    this.name = ResourceNotFoundError.name
  }
}
