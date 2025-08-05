
import type { FastifyReply, FastifyRequest } from "fastify";
import { GetAllRoleService } from "../../Services/Role/CreateRoleService";

export class CreateRoleController {
  async handle( _request: FastifyRequest, reply: FastifyReply ) {

    const service = new GetAllRoleService();

    const role = await service.execute();

    return reply.status(200).send(role);
    
  }
}