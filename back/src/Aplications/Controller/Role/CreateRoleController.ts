
import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateRoleRequestDTO } from "../../../DTOs/Roles/CreateRoleDTO";
import { CreateRoleService } from "../../Services/Role/CreateRoleService";

export class CreateRoleController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const { name, description } = request.body as CreateRoleRequestDTO

    const service = new CreateRoleService();

    const role = await service.execute({ name, description });

    return reply.status(201).send(role);
    
  }
}