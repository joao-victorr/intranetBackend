// src/Schemas/Shared/ErrorSchemas.ts

import { z } from "zod";

export const ErrorResponseSchema = z.object({
  statusCode: z.number().int(),
  error: z.string(),     // Deve ser exatamente o nome da classe do erro, mas deixamos flexível
  message: z.string()
});

// Schemas específicos por tipo de erro (se quiser detalhar ainda mais):
export const BadRequestSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(400),
  error: z.literal("BadRequestError")
});

export const NotFoundSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(404),
  error: z.literal("NotFoundError")
});

export const UnauthorizedSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(401),
  error: z.literal("UnauthorizedError")
});

export const ForbiddenSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(403),
  error: z.literal("ForbiddenError")
});
