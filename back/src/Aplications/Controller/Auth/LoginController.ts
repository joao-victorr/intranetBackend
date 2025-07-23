import type { FastifyReply, FastifyRequest } from "fastify";
import { LoginService } from "../../../Aplications/Services/Auth/LoginService";
import type { LoginRequestDTO } from "../../../DTOs/Auth/LoginDTO";

export class LoginController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const { username, password } = request.body as LoginRequestDTO

    const service = new LoginService();
    const auth = await service.execute({ username, password });
    
    // auth.refreshToken.createdAt = new Date("2025-07-22T01:57:25.492Z");
    // auth.refreshToken.expiresAt = new Date("2025-07-29T01:57:01.553Z");
    
    // console.log("date", new Date(auth.refreshToken.expiresAt))

    // console.log("Auth", auth)




    return reply.code(200).send(auth);
  }
}