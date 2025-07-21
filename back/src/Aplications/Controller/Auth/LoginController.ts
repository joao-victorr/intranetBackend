import { LoginService } from "Aplications/Services/Auth/LoginService";
import type { LoginRequestDTO } from "DTOs/Auth/LoginDTO";
import type { FastifyReply, FastifyRequest } from "fastify";

export class LoginController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const { username, password } = request.body as LoginRequestDTO


    const service = new LoginService();
    const auth = await service.execute({ username, password });
    console.log(auth)
    return reply.code(200).send(auth);
  }
}