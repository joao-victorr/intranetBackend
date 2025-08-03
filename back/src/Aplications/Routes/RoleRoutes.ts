import { GlobalPermissions } from "../../Domain/Permissions/GlobalPermissions";
import { BadRequestSchema, UnauthorizedSchema } from "../../DTOs/Global/ErrorsDTO";
import { AssingRolePermissionsReplySchema, AssingRolePermissionsRequestBodySchema, AssingRolePermissionsRequestParamsSchema } from "../../DTOs/Roles/AssingRolePermissionDTO";
import { CreateRoleReplySchema, CreateRoleRequestSchama } from "../../DTOs/Roles/CreateRoleDTO";
import { EnsureAuthenticated } from "../../Infrastructure/Security/EnsureAutenticated";
import { HasPermission } from "../../Infrastructure/Security/HasPermissions";
import type { FastifyTypedInstance } from "../../Types/Fastify";
import { AssingRolePermissionsController } from "../Controller/Role/AssingRolePermissionsController";
import { CreateRoleController } from "../Controller/Role/CreateRoleController";



const createRoleController = new CreateRoleController();
const assingRolePermissionsController = new AssingRolePermissionsController();


export const RoleRoutes = async (server: FastifyTypedInstance) => {
  server.post(
    "/",
    {
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.roles.create.name)],
      schema: {
        tags: ["Role"],
        operationId: "Create.Role",
        summary: "Create a new role",
        description: "Create a new role with a name and an optional description.",
        body: CreateRoleRequestSchama,
        response: {
          200: CreateRoleReplySchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema,
        }
      }
    },
    createRoleController.handle
  );

  server.put(
    "/:roleId/permissions",
    {
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.roles.assignPermissions.name)],
      schema: {
        tags: ["Role"],
        operationId: "Assing.Role.Permissions",
        summary: "Assign permissions to a role",
        description: "Assigns a list of permissions to a role by its ID.",
        params: AssingRolePermissionsRequestParamsSchema,
        body: AssingRolePermissionsRequestBodySchema,
        response: {
          200: AssingRolePermissionsReplySchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema,
        }
      }
    },
    assingRolePermissionsController.handle    
  )
};