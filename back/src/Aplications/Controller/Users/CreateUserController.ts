

import { CreateUserService } from "Aplications/Services/Users/CreateUserService";
import type { CreateUserRequestDTO } from "DTOs/Users/CreateUserDTO";
import type { FastifyReply, FastifyRequest } from "fastify";

export class CreateUserController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const user = request.body as CreateUserRequestDTO

    const service = new CreateUserService();
    const { id } = await service.execut(user);

    return reply.code(201).send({ id })
  }
}

