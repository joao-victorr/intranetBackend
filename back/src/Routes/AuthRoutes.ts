import type { FastifyTypedInstance } from "@Types/Fastify";
import { LoginReplySchema, LoginRequestSchema } from "DTOs/Auth/LoginDTO";
import { z } from "zod";

export const AuthRoutes = async (server: FastifyTypedInstance) => {
  server.post(
    "/login",
    {
      schema: {
        tags: ['Auth'],
        operationId: "Auth.login",  
        summary: "User login",
        description: "Authenticate user with username and password. Returns JWT token on success.",
        body: LoginRequestSchema,
        response: {
          200: LoginReplySchema,
          401: z.object({
            statusCode: z.literal(401),
            message: z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { username, password } = request.body;

      // Exemplo fixo de resposta
      const mockResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
          name: username,
          username: username + password
        }
      };

      // Em produção, verifique usuário e senha aqui
      return reply.code(200).send(mockResponse);
    }
  );
};
