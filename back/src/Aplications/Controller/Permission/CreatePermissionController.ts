import type { FastifyReply, FastifyRequest } from "fastify";
import { GetAllPermissionService } from "../../Services/Permission/CreatePermissionService";

export class CreatePermissionController {
  async handle( _request: FastifyRequest, reply: FastifyReply ) {

    const service = new GetAllPermissionService();

    const permission = await service.execute();

    return reply.status(200).send(permission);
  }
}