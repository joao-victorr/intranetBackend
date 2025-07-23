import type { FastifyReply, FastifyRequest } from "fastify";
import type { DeleteUserByIdRequestDTO } from "../../../DTOs/Users/DeleteUserByIdDTO";
import { DeleteUserByIdService } from "../../Services/Users/DeleteUserByIdService";

export class DeleteUserByIdController {
  async handle( request: FastifyRequest, reply: FastifyReply ) {
    const { id } = request.params as DeleteUserByIdRequestDTO;

    const service = new DeleteUserByIdService();
    const result = await service.execute({ id });
    return reply.code(200).send(result);
  }
}