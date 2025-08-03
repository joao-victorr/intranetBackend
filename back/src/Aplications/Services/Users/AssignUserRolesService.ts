import { BadRequestError } from "../../../Domain/Errors/AppErrors";
import type { AssignUserRolesReplyDTO, AssignUserRolesRequestDTO } from "../../../DTOs/Users/AssignUserRoleDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class AssingUserRolesService {
  async execute({ userId, roles }: AssignUserRolesRequestDTO): Promise<AssignUserRolesReplyDTO> {
    const user = await repo.user.findUnique({
      where: {
        id: userId
      },
      include: {
        UserRoles: true
      }
    })

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const existingRoles = await repo.role.findMany({
      where: {
        id: {
          in: roles
        }
      },
      select: {
        id: true
      }
    });

    console.log("teste");

    if (existingRoles.length !== roles.length) {
      throw new BadRequestError("Some Roles do not exist");
    }

    

    const permissionToAssing = roles.filter(RolesId => !user.UserRoles.some(permission => permission.roleId === RolesId));


    await repo.userRole.createMany({
      data: permissionToAssing.map(roleId => ({
        userId,
        roleId
      })),
      skipDuplicates: true
    });

    const userRoles = await repo.userRole.findMany({
      where: {
        userId
      },
      select: {
        roleId: true
      }
    });

    return {
      userId,
      roles: userRoles.map(roles => roles.roleId)
    }
  }
}