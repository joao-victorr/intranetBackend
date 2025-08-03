import { BadRequestError } from "../../../Domain/Errors/AppErrors";
import type { AssingRolePermissionsReplyDTO, AssingRolePermissionsRequestDTO } from "../../../DTOs/Roles/AssingRolePermissionDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class AssingRolePermissionsServices {
  async execute({roleId, permissions}: AssingRolePermissionsRequestDTO): Promise<AssingRolePermissionsReplyDTO> {
    
    const role = await repo.role.findUnique({
      where: {
        id: roleId
      },
      include: {
        RolePermissions: true
      }
    })

    if (!role) {
      throw new BadRequestError("Role not found");
    }

    const existingPermissions = await repo.permission.findMany({
      where: {
        id: {
          in: permissions
        }
      },
      select: {
        id: true
      }
    });
    if (existingPermissions.length !== permissions.length) {
      throw new BadRequestError("Some permissions do not exist");
    }

    const permissionToAssing = permissions.filter(permissionsId => !role.RolePermissions.some(permission => permission.permissionId === permissionsId));


    await repo.rolePermission.createMany({
      data: permissionToAssing.map(permissionId => ({
        roleId,
        permissionId
      })),
      skipDuplicates: true
    });

    const rolePermissions = await repo.rolePermission.findMany({
      where: {
        roleId
      },
      select: {
        permissionId: true
      }
    });

    return {
      roleId,
      permissions: rolePermissions.map(permission => permission.permissionId)
    }
  }
}