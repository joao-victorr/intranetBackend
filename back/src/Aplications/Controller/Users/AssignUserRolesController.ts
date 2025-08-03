

import type { FastifyReply, FastifyRequest } from "fastify";
import type { AssignUserRolesRequestBodyDTO, AssignUserRolesRequestParamsDTO } from "../../../DTOs/Users/AssignUserRoleDTO";
import { AssingUserRolesService } from "../../Services/Users/AssignUserRolesService";

export class AssignUserRolesController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const { userId } = request.params as AssignUserRolesRequestParamsDTO;
    const { roleId } = request.body as AssignUserRolesRequestBodyDTO;

    const service = new AssingUserRolesService();
    const result = await service.execute({ userId, roleId });
    return reply.status(200).send(result);

  }
}