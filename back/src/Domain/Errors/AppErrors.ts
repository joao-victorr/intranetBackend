// src/Domain/Errors/AppErrors.ts

export class AppError extends Error {
  public readonly statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.name = 'AppError'; // Adicionado para melhor depuração
    Object.setPrototypeOf(this, AppError.prototype); // Garante a cadeia de protótipos
  }
};

export class BadRequestError extends AppError { // Nome corrigido
  constructor(message: string) { // Adicionado default message
    super(400, message)
    this.name = 'BadRequestError'; // Adicionado
    Object.setPrototypeOf(this, BadRequestError.prototype); // Adicionado
  }
};

export class NotFoundError extends AppError {
  constructor(message: string) { // Adicionado default message
    super(404, message)
    this.name = 'NotFoundError'; // Adicionado
    Object.setPrototypeOf(this, NotFoundError.prototype); // Adicionado
  }
};

export class UnauthorizedError extends AppError { // Nome corrigido
  constructor(message: string) { // Adicionado default message
    super(401, message)
    this.name = 'UnauthorizedError'; // Adicionado
    Object.setPrototypeOf(this, UnauthorizedError.prototype); // Adicionado
  }
};

// Exemplo de um erro 403 Forbidden, se precisar
export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(403, message);
    this.name = 'ForbiddenError';
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}