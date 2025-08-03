

import type { FastifyReply, FastifyRequest } from "fastify";
import type { AssingUserPermissionsRequestBodyDTO, AssingUserPermissionsRequestParamsDTO } from "../../../DTOs/Users/AssingUserPermissionDTO";
import { AssingUserPermissionsServices } from "../../Services/Users/AssingUserPermissionsServices";

export class AssingUserPermissionsController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const { userId } = request.params as AssingUserPermissionsRequestParamsDTO
    const { permissions } = request.body as AssingUserPermissionsRequestBodyDTO;

    const service = new AssingUserPermissionsServices();
    const result = await service.execute({userId, permissions});

    return reply.status(200).send(result);
  }
}