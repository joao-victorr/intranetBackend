import type { FastifyReply, FastifyRequest } from "fastify";
import { repo } from "../Databases/Prisma/PrismaClient";

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
        UserRoles: {
          include: {
            Roles: {
              include: {
                RolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        UserPermissions: {
          include: {
            Permission: true,
          },
        },
      },
    });

    if (!user) {
      return reply.status(401).send({ message: "Usuário não encontrado" });
    }

    const rolePermissions = user.UserRoles.flatMap((ur) =>
      ur.Roles.RolePermissions.map((rp) => rp.permission.name)
    );

    const userPermissions = user.UserPermissions.map((up) => up.Permission.name);

    const allPermissions = new Set([...rolePermissions, ...userPermissions]);

    const hasResourceFull = allPermissions.has(`${resource}.full`);
    const hasSpecific = allPermissions.has(requiredPermission);
    const isSuperadmin = allPermissions.has("admin.superadmin");

    if (isSuperadmin || hasResourceFull || hasSpecific) return;

    return reply.status(403).send({ message: "Permissão negada" });
  };
}
