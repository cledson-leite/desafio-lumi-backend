export class InvalidParams extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidParams';
  }
}
