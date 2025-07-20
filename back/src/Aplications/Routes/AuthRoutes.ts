import type { FastifyTypedInstance } from "@Types/Fastify";
import { LoginController } from "Aplications/Controller/Auth/LoginController";
import { LoginReplySchema, LoginRequestSchema } from "DTOs/Auth/LoginDTO";
import { UnauthorizedSchema } from "DTOs/Global/ErrorsDTO";


const loginController = new LoginController()


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
          401: UnauthorizedSchema
        }
      }
    },
    loginController.handle
  );
};
