import { BadRequestError } from "../../../Domain/Errors/AppErrors";
import type { AssignUserRolesReplyDTO, AssignUserRolesRequestDTO } from "../../../DTOs/Users/AssignUserRoleDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class AssingUserRolesService {
  async execute({ userId, roleId }: AssignUserRolesRequestDTO): Promise<AssignUserRolesReplyDTO> {
    // Here you would typically interact with your database or service to create the user role
    // For example:
    // const newRole = await this.userRoleService.createUserRole(userId, roleId);

    const userExists = await repo.user.findUnique({
      where: { id: userId }
    });
    if (!userExists) {
      throw new BadRequestError("User does not exist");
    }

    const roleExists = await repo.role.findUnique({
      where: { id: roleId }
    });
    if (!roleExists) {
      throw new BadRequestError("Role does not exist");
    }

    await repo.user.update({
      where: { id: userId },
      data: {
        roleId: roleId
      }
    })
    
    // Simulating a successful response
    return {
      success: true,
      message: `Role ${roleId} assigned to user ${userId}`
    }
    
  }
}