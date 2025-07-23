import { LoginController } from "../../Aplications/Controller/Auth/LoginController";
import { RefreshTokenController } from "../../Aplications/Controller/Auth/RefreshTokenController";
import { LoginReplySchema, LoginRequestSchema } from "../../DTOs/Auth/LoginDTO";
import { RefreshTokenReplySchema, RefreshTokenRequestSchema } from "../../DTOs/Auth/RefreshTokenDTO";
import { UnauthorizedSchema } from "../../DTOs/Global/ErrorsDTO";
import type { FastifyTypedInstance } from "../..//Types/Fastify";


const loginController = new LoginController()
const refreshTokenController = new RefreshTokenController();


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

  server.post(
    "/refresh-token",
    {
      schema: {
        tags: ['Auth'],
        operationId: "Auth.RefrashToken",  
        summary: "Refash Token User",
        description: "Authenticate user with refrash token. Returns JWT token on success.",
        body: RefreshTokenRequestSchema,
        response: {
          200: RefreshTokenReplySchema,
          401: UnauthorizedSchema
        }
      }
    },
    refreshTokenController.handle
  );
};
