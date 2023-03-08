export class UserAlreadyExistsError extends Error {
  constructor(msg = 'User already exists') {
    super(msg)
  }
}
