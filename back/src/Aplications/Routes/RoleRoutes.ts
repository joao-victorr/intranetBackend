import { GlobalPermissions } from "../../Domain/AccessControl/Permissions/GlobalPermissions";
import { BadRequestSchema, UnauthorizedSchema } from "../../DTOs/Global/ErrorsDTO";
import { GetAllRolesReplySchema } from "../../DTOs/Roles/CreateRoleDTO";
import { EnsureAuthenticated } from "../../Infrastructure/Security/EnsureAutenticated";
import { HasPermission } from "../../Infrastructure/Security/HasPermissions";
import type { FastifyTypedInstance } from "../../Types/Fastify";
import { CreateRoleController } from "../Controller/Role/CreateRoleController";



const createRoleController = new CreateRoleController();


export const RoleRoutes = async (server: FastifyTypedInstance) => {
  server.get(
    "/",
    {
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.roles.viewer.name)],
      schema: {
        tags: ["Role"],
        operationId: "Get.All.Role",
        summary: "Get all role",
        description: "Get all roles",
        response: {
          200: GetAllRolesReplySchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema,
        }
      }
    },
    createRoleController.handle
  );

};