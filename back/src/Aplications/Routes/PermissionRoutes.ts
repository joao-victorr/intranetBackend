
import { GlobalPermissions } from "../../Domain/Permissions/GlobalPermissions";
import { BadRequestSchema, UnauthorizedSchema } from "../../DTOs/Global/ErrorsDTO";
import { CreatePermissionReplySchema, CreatePermissionRequestSchama } from "../../DTOs/Permissions/CreatePermissionDTO";
import { EnsureAuthenticated } from "../../Infrastructure/Security/EnsureAutenticated";
import { HasPermission } from "../../Infrastructure/Security/HasPermissions";
import type { FastifyTypedInstance } from "../../Types/Fastify";
import { CreatePermissionController } from "../Controller/Permission/CreatePermissionController";

const createPermissionController = new CreatePermissionController();


export const PermissionRoutes = async (server: FastifyTypedInstance) => {
  server.post(
    "/",
    {
      preHandler: [EnsureAuthenticated, HasPermission(GlobalPermissions.admin.superadmin.name)],
      schema: {
        tags: ["Permission"],
        operationId: "Create.Permission",
        summary: "Crete Permission",
        description: "Create a new permission with a name and an optional description.",
        body: CreatePermissionRequestSchama,
        response: {
          201: CreatePermissionReplySchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema,
        }
      }
    },
    createPermissionController.handle
  );
};