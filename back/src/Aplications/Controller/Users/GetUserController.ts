

import { GetUsersService } from "Aplications/Services/Users/GetUsersService";
import type { FastifyReply, FastifyRequest } from "fastify";

export class GetUserController {
  async handle( _request: FastifyRequest, reply: FastifyReply ) {
    
    const service = new GetUsersService();
    const users = await service.execute();
    return reply.code(200).send(users);
  }
}