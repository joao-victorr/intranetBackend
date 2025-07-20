import { EnsureAuthenticated } from "@Infrastructure/Security/EnsureAutenticated";
import type { FastifyTypedInstance } from "@Types/Fastify";
import { CreateUserByIdController } from "Aplications/Controller/Users/CreateUserByIdController";
import { CreateUserController } from "Aplications/Controller/Users/CreateUserController";
import { GetUserController } from "Aplications/Controller/Users/GetUserController";
import { BadRequestSchema, UnauthorizedSchema } from "DTOs/Global/ErrorsDTO";
import { CreateUserReplySchema, CreateUserRequestSchema } from "DTOs/Users/CreateUserDTO";
import { GetUserByIdReplySchama, GetUserByIdRequestSchema } from "DTOs/Users/GetUserByIdDTO";
import { GetUsersReplySchema } from "DTOs/Users/GetUsersDTO";



const createUserController = new CreateUserController();
const createUserByIdController = new CreateUserByIdController();
const getUserController = new GetUserController()


export const UsersRoutes = async (server: FastifyTypedInstance) => {
  server.post(
    "/",
    {
      preHandler: EnsureAuthenticated,
      schema: {
        tags: ["User"],
        operationId: "Create.User",
        summary: "Create User",
        description: "Create User",
        security: [{
          bearerAuth: []
        }],
        body: CreateUserRequestSchema,
        response: {
          200: CreateUserReplySchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema
        }
      }
    },
    createUserController.handle
  );

  server.get(
    "/",
    {
      preHandler: EnsureAuthenticated,
      schema: {
        tags: ["User"],
        operationId: "Get.User.By.Id",
        summary: "Get user by ID",
        description: "Get user by ID",
        security: [{
          bearerAuth: []
        }],
        response: {
          200: GetUsersReplySchema,
          401: UnauthorizedSchema
        }
      }
    },
    getUserController.handle
  );

  server.get(
    "/:id",
    {
      preHandler: EnsureAuthenticated,
      schema: {
        tags: ["User"],
        operationId: "Get.User.By.Id",
        summary: "Get user by ID",
        description: "Get user by ID",
        security: [{
          bearerAuth: []
        }],
        params: GetUserByIdRequestSchema,
        response: {
          200: GetUserByIdReplySchama,
          401: UnauthorizedSchema
        }
      }
    },
    createUserByIdController.handle
  );

};