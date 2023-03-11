export class MaxNumberOfCheckInsError extends Error {
  constructor(msg = 'Max number of check-ins exceeded') {
    super(msg)
    this.name = MaxNumberOfCheckInsError.name
  }
}
