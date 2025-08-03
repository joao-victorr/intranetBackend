import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreatePermissionRequestDTO } from "../../../DTOs/Permissions/CreatePermissionDTO";
import { CreatePermissionService } from "../../Services/Permission/CreatePermissionService";

export class CreatePermissionController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const { name, description } = request.body as CreatePermissionRequestDTO

    const service = new CreatePermissionService();

    const permission = await service.execute({ name, description });

    return reply.status(201).send(permission);
  }
}