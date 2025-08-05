
import { GlobalPermissions } from "../../Domain/AccessControl/Permissions/GlobalPermissions";
import { BadRequestSchema, UnauthorizedSchema } from "../../DTOs/Global/ErrorsDTO";
import { GetAllPermissionSchema } from "../../DTOs/Permissions/GetAllPermissionDTO";
import { EnsureAuthenticated } from "../../Infrastructure/Security/EnsureAutenticated";
import { HasPermission } from "../../Infrastructure/Security/HasPermissions";
import type { FastifyTypedInstance } from "../../Types/Fastify";
import { CreatePermissionController } from "../Controller/Permission/CreatePermissionController";

const createPermissionController = new CreatePermissionController();


export const PermissionRoutes = async (server: FastifyTypedInstance) => {
  server.get(
    "/",
    {
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.permissions.viewer.name)],
      schema: {
        tags: ["Permission"],
        operationId: "Get.Permission",
        summary: "Get Permission",
        description: "Get all permissions",
        response: {
          200: GetAllPermissionSchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema,
        }
      }
    },
    createPermissionController.handle
  );
};