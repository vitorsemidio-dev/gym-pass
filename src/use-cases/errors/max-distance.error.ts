export class MaxDistanceError extends Error {
  constructor(msg = 'Max distance exceeded') {
    super(msg)
    this.name = MaxDistanceError.name
  }
}
