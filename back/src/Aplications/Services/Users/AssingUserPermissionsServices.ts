import { BadRequestError } from "../../../Domain/Errors/AppErrors";
import type { AssingUserPermissionsReplyDTO, AssingUserPermissionsRequestDTO } from "../../../DTOs/Users/AssingUserPermissionDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class AssingUserPermissionsServices {
  async execute({userId, permissions}: AssingUserPermissionsRequestDTO): Promise<AssingUserPermissionsReplyDTO> {
    
    const user = await repo.user.findUnique({
      where: {
        id: userId
      },
      include: {
        UserPermissions: true
      }
    })


    if (!user) {
      throw new BadRequestError("User not found");
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

    const permissionToAssing = permissions.filter(permissionsId => !user.UserPermissions.some(permission => permission.permissionId === permissionsId));


    await repo.userPermission.createMany({
      data: permissionToAssing.map(permissionId => ({
        userId,
        permissionId
      })),
      skipDuplicates: true
    });

    const userPermissions = await repo.userPermission.findMany({
      where: {
        userId
      },
      select: {
        permissionId: true
      }
    });

    return {
      userId,
      permissions: userPermissions.map(permission => permission.permissionId)
    }
  }
}