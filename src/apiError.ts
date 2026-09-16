/**
 * apiError.ts
 * -----------
 * Clase de error personalizada para poder distinguir "errores de negocio
 * esperados" (404, 400) de errores inesperados (500), y llevar el status
 * HTTP junto con el error mismo.
 */

export class ApiError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}