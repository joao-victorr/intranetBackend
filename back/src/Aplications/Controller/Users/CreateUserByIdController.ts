

import type { FastifyReply, FastifyRequest } from "fastify";
import { GetUserByIdService } from "../../../Aplications/Services/Users/GetUserByIdService";
import type { GetUserByIdRequestDTO } from "../../../DTOs/Users/GetUserByIdDTO";

export class CreateUserByIdController {
  async handle( request: FastifyRequest, _reply: FastifyReply ) {
    const { id } = request.params as GetUserByIdRequestDTO;

    const service = new GetUserByIdService();
    const user = await service.execute({ id });
    return user;
  }
}