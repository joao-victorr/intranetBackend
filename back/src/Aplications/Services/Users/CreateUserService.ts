import { BadRequestError } from "@Domain/Errors/AppErrors";
import type { CreateUserReplyDTO, CreateUserRequestDTO } from "DTOs/Users/CreateUserDTO";
import { repo } from "Infrastructure/Databases/Prisma/PrismaClient";
import { hashPassword } from "Infrastructure/Security/EncryptionUtilit";







export class CreateUserService {
  async execut(user: CreateUserRequestDTO): Promise<CreateUserReplyDTO> {
    
    const verifyExistUser = await repo.user.findUnique({
      where: {
        username: user.username
      }
    });

    if (verifyExistUser) {
      const mesageError = "User already exists"
      throw new BadRequestError( mesageError );
    }

    const passwordhash = await hashPassword(user.password);

    const newUser = await repo.user.create({
      data: {
        name: user.name,
        surname: user.surname,
        username: user.username,
        password: passwordhash,
        birthDate: user.birthDate
      },
      omit: {
        password: true
      }
    })

    return { id: newUser.id }

  }
}