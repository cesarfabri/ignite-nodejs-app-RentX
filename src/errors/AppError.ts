export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  // Caso não seja passado o statusCode será 400 por default
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
