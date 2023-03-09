export class InvalidCredentialsError extends Error {
  constructor(msg = 'Invalid credentials') {
    super(msg)
    this.name = InvalidCredentialsError.name
  }
}
