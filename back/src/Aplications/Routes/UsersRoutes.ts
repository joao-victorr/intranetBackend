import { CreateUserByIdController } from "../../Aplications/Controller/Users/CreateUserByIdController";
import { CreateUserController } from "../../Aplications/Controller/Users/CreateUserController";
import { GetUserController } from "../../Aplications/Controller/Users/GetUserController";
import { GlobalPermissions } from "../../Domain/AccessControl/Permissions/GlobalPermissions";
import { BadRequestSchema, UnauthorizedSchema } from "../../DTOs/Global/ErrorsDTO";
import { AssignUserRoleReplySchema, AssignUserRolesRequestBodySchema, AssignUserRolesRequestParamsSchema } from "../../DTOs/Users/AssignUserRoleDTO";
import { AssingUserPermissionsReplySchema, AssingUserPermissionsRequestBodySchema, AssingUserPermissionsRequestParamsSchema } from "../../DTOs/Users/AssingUserPermissionDTO";
import { CreateUserReplySchema, CreateUserRequestSchema } from "../../DTOs/Users/CreateUserDTO";
import { DeleteUserByIdReplySchema, DeleteUserByIdRequestSchema } from "../../DTOs/Users/DeleteUserByIdDTO";
import { GetUserByIdReplySchama, GetUserByIdRequestSchema } from "../../DTOs/Users/GetUserByIdDTO";
import { GetUsersReplySchema } from "../../DTOs/Users/GetUsersDTO";
import { EnsureAuthenticated } from "../../Infrastructure/Security/EnsureAutenticated";
import { HasPermission } from "../../Infrastructure/Security/HasPermissions";
import type { FastifyTypedInstance } from "../../Types/Fastify";
import { AssignUserRolesController } from "../Controller/Users/AssignUserRolesController";
import { AssingUserPermissionsController } from "../Controller/Users/AssingUserPermissionsController";
import { DeleteUserByIdController } from "../Controller/Users/DeleteUserByIdController";



const createUserController = new CreateUserController();
const createUserByIdController = new CreateUserByIdController();
const getUserController = new GetUserController()
const deleteUserByIdController = new DeleteUserByIdController()
const assignUserRolesController = new AssignUserRolesController();
const assingUserPermissionsController = new AssingUserPermissionsController();


export const UsersRoutes = async (server: FastifyTypedInstance) => {
  server.post(
    "/",
    {
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.users.create.name)],
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
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.users.list.name)],
      schema: {
        tags: ["User"],
        operationId: "Get.Users",
        summary: "Get users",
        description: "Get users",
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
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.users.viewer.name)],
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

  
  server.delete(
    "/:id",
    {
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.users.delete.name)],
      schema: {
        tags: ["User"],
        operationId: "Delete.User.By.Id",
        summary: "Delete user by ID",
        description: "Delete user by ID",
        security: [{
          bearerAuth: []
        }],
        params: DeleteUserByIdRequestSchema,
        response: {
          200: DeleteUserByIdReplySchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema,
        }
      }
    },
    deleteUserByIdController.handle
  );

  server.put(
    "/:userId/role",
    {
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.users.assignRoles.name)],
      schema: {
        tags: ["User"],
        operationId: "Assign.User.Role",
        summary: "Assign role to user",
        description: "Assign role to user",
        security: [{
          bearerAuth: []
        }],
        params: AssignUserRolesRequestParamsSchema,
        body: AssignUserRolesRequestBodySchema,
        response: {
          200: AssignUserRoleReplySchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema
        }
      }
    },
    assignUserRolesController.handle
  )

  server.put(
    "/:userId/permissions",
    {
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.users.assignPermissions.name)],
      schema: {
        tags: ["User"],
        operationId: "Assign.User.Permissions",
        summary: "Assign permissions to user",
        description: "Assign permissions to user",
        security: [{
          bearerAuth: []
        }],
        params: AssingUserPermissionsRequestParamsSchema,
        body: AssingUserPermissionsRequestBodySchema,
        response: {
          200: AssingUserPermissionsReplySchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema
        }
      }
    },
    assingUserPermissionsController.handle
  );

};