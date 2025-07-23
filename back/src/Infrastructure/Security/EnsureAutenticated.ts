import type { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../../Domain/Errors/AppErrors";
import { verifyToken } from "../../Infrastructure/Auth/JWT";


export async function EnsureAuthenticated(req: FastifyRequest, _reply: FastifyReply) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Cabeçalho Authorization faltando");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Formato de autorização inválido. Esperado 'Bearer <token>'.");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError("Token faltando");
  }

  const payload = verifyToken(token); // Agora erros aqui serão capturados pelo seu error handler

  req.user = { id: String(payload.sub) };
}
