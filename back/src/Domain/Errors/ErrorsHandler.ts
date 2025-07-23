import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./AppErrors";

export const ErrorsHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const logger = request.server.log;

  // Se for erro da aplicação (customizado)
  if (error instanceof AppError) {
    logger.error(`AppError [${error.statusCode}]: ${error.message}`);
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    });
  }

  // Se tiver statusCode e message, provavelmente é algo tratável (ex: Zod, Prisma)
  const statusCode = typeof error.statusCode === "number" ? error.statusCode : 400;
  const message = error.message || "Erro desconhecido.";

  logger.error(`Erro tratado [${statusCode}]: ${message}`, error);

  return reply.status(statusCode).send({
    statusCode,
    error: error.name || "BadRequest",
    message,
  });
};
