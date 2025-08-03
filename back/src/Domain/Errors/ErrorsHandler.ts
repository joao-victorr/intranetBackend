// src/Domain/Errors/ErrorsHandler.ts
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { AppError } from "./AppErrors";

export const ErrorsHandler = (
  error: FastifyError | ZodError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const logger = request.server.log;

  // Lida com erros da sua aplicação (AppError)
  if (error instanceof AppError) {
    logger.error(`AppError [${error.statusCode}]: ${error.message}`);
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    });
  }

  // Lida com erros de validação do Zod
  if (error instanceof ZodError) {
    const formattedError = {
      statusCode: 400,
      error: "ValidationError",
      message: "Dados de requisição inválidos.",
      issues: error.errors.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
    logger.error(`Erro de validação [400]:`, formattedError);
    return reply.status(400).send(formattedError);
  }

  // Lida com erros genéricos do Fastify (ex: JSON inválido, rota não encontrada)
  if (error.statusCode) {
    logger.error(`Erro Fastify [${error.statusCode}]: ${error.message}`);
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: "BadRequestError",
      message: error.message,
    });
  }

  // Lida com erros inesperados
  logger.error(`Erro interno do servidor [500]: ${error.message}`, error);
  return reply.status(500).send({
    statusCode: 500,
    error: "InternalServerError",
    message: "Ocorreu um erro inesperado no servidor.",
  });
};