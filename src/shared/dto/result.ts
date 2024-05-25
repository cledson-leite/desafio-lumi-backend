export class Result<T> {
  constructor(
    public readonly success: T,
    public readonly failure: string,
  ) {}

  static Success(result: any) {
    return new Result<typeof result>(result, null);
  }

  static Failure(message: string) {
    return new Result<null>(null, message);
  }

  static ParamsNotFound = 'Parameters not found';
  static ClientNotFound = 'Client not found';
  static YearNotFound = 'This year reference is not listed';
}
