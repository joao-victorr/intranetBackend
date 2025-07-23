import { BadRequestError } from "../../../Domain/Errors/AppErrors";
import type { DeleteUserByIdReplyDTO } from "../../../DTOs/Users/DeleteUserByIdDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class DeleteUserByIdService {
  async execute({ id }: { id: string }): Promise<DeleteUserByIdReplyDTO> {

    const user = await repo.user.findUnique({
      where: {
        id
      }
    })

    if(!user) {
      throw new BadRequestError("User not found");
    }
    
    await repo.$transaction([
      user.isDeleted
        ? repo.user.delete({ where: { id: user.id } })
        : repo.user.update({
            where: { id: user.id },
            data: {
              isDeleted: true,
              deletedAt: new Date()
            }
          }),
          repo.session.updateMany({ 
            where: { userId: user.id },
            data: {
              isRevoked: true
            }
          })
    ]);
    
    return { message: user.isDeleted ? "User deleted successfully" : "User deactivated successfully" };
    
  }
}