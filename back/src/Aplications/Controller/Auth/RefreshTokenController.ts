import type { FastifyReply, FastifyRequest } from "fastify";
import { RefreshTokenService } from "../../../Aplications/Services/Auth/RefreshTonkenService";
import type { RefreshTokenRequestDTO } from "../../../DTOs/Auth/RefreshTokenDTO";

export class RefreshTokenController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const { refreshToken } = request.body as RefreshTokenRequestDTO;

    const service = new RefreshTokenService();
    const access = await service.execute(refreshToken);

    return reply.code(200).send(access);
  }
}