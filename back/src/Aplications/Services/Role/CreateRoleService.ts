import type { GetAllRolesReplyDTO } from "../../../DTOs/Roles/CreateRoleDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class GetAllRoleService {
  async execute(): Promise<GetAllRolesReplyDTO> {
    const roles = await repo.role.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        RolePermissions: {
          include: {
            permission: true
          },
        },
      }
    });

    return roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.RolePermissions.map(rolePermission => ({
        id: rolePermission.permission.id,
        name: rolePermission.permission.name,
        description: rolePermission.permission.description
      }))
    }));

    
  }
}