export default class TokenValidationError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 401) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
