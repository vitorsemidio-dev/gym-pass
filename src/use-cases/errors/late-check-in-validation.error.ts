export class LateCheckInValidateError extends Error {
  constructor(
    msg = 'The check-in can only be validated until 20 minutes of its creation.',
  ) {
    super(msg)
    this.name = LateCheckInValidateError.name
  }
}
