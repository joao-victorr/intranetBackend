

import type { FastifyReply, FastifyRequest } from "fastify";
import { GetUsersService } from "../../../Aplications/Services/Users/GetUsersService";

export class GetUserController {
  async handle( _request: FastifyRequest, reply: FastifyReply ) {
    
    const service = new GetUsersService();
    const users = await service.execute();
    return reply.code(200).send(users);
  }
}