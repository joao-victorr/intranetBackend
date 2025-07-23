import type { GetUsersReplyDTO } from "../../../DTOs/Users/GetUsersDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class GetUsersService {
  async execute(): Promise<GetUsersReplyDTO> {
    const users = await repo.user.findMany({
      omit: {
        password: true
      }
    });


    return users
  }
}