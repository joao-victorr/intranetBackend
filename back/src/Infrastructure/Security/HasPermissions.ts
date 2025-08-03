
import type { FastifyReply, FastifyRequest } from "fastify";
import { repo } from "../Databases/Prisma/PrismaClient";

// 1. Extrai o userId do token JWT (ou de qualquer contexto da sua app);
// 2. Busca as permissões da Role do usuário e também permissões personalizadas (UserPermission);
// 3. Verifica se ele possui a permissão exigida pela rota;
// 4. Se não tiver, bloqueia com 403 Forbidden.

export function HasPermission(requiredPermission: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({ message: "Usuário não autenticado" });
    }

    const [resource, action] = requiredPermission.split(".");
    if (!resource || !action) {
      return reply.status(400).send({ message: "Permissão inválida" });
    }

    const user = await repo.user.findUnique({
      where: { id: userId },
      include: {
        Role: {
          include: {
            permissions: {
              include: { permission: true }, // remove o filtro aqui
            },
          },
        },
        permissions: {
          include: { Permission: true }, // remove o filtro aqui também
        },
      },
    });

    if (!user) {
      return reply.status(401).send({ message: "Usuário não encontrado" });
    }

    const rolePermissions = user.Role?.permissions.map((rp) => rp.permission.name) || [];
    const userPermissions = user.permissions.map((up) => up.Permission.name);

    const allPermissions = new Set([...rolePermissions, ...userPermissions]);
    

    const hasResourceFull = allPermissions.has(`${resource}.full`);
    const hasSpecific = allPermissions.has(requiredPermission);
    const isSuperadmin = allPermissions.has("admin.superadmin");

    if (isSuperadmin || hasResourceFull || hasSpecific) return;

    // Sem permissão
    return reply.status(403).send({ message: "Permissão negada" });
  };
}