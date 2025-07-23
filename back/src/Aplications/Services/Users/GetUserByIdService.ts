import { BadRequestError } from "../../../Domain/Errors/AppErrors";
import type { GetUserByIdReplyDTO, GetUserByIdRequestDTO } from "../../../DTOs/Users/GetUserByIdDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class GetUserByIdService {
  async execute({ id }: GetUserByIdRequestDTO): Promise<GetUserByIdReplyDTO> {
    
    const user = await repo.user.findUnique({
      where: {
        id
      },
      omit: {
        password: true
      }
    })

    if (!user) {
      throw new BadRequestError("UserId not found");
    }

    return user
  }
}