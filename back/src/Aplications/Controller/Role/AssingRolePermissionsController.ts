

import type { FastifyReply, FastifyRequest } from "fastify";
import type { AssingRolePermissionsRequestBodyDTO, AssingRolePermissionsRequestParamsDTO } from "../../../DTOs/Roles/AssingRolePermissionDTO";
import { AssingRolePermissionsServices } from "../../Services/Role/AssingRolePermissionsServices";

export class AssingRolePermissionsController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const { roleId } = request.params as AssingRolePermissionsRequestParamsDTO
    const { permissions } = request.body as AssingRolePermissionsRequestBodyDTO;

    const service = new AssingRolePermissionsServices();
    const result = await service.execute({roleId, permissions});

    return reply.status(200).send(result);
  }
}