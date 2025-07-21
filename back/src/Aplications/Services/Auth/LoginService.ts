import { UnauthorizedError } from "@Domain/Errors/AppErrors";
import { signToken } from "Infrastructure/Auth/JWT";
import { repo } from "Infrastructure/Databases/Prisma/PrismaClient";
import { comparePassword } from "Infrastructure/Security/EncryptionUtilit";
import { z } from "zod";

export const AuthRequestSchema = z.object({
  username: z.string(),
  password: z.string()
})

export type AuthRequestDTO = z.infer<typeof AuthRequestSchema>;

export class LoginService {
  async execute({username, password}: AuthRequestDTO) {
    
    const user = await repo.user.findFirst({
      where: {
        username
      }
    })

    if (!user) {
      const mensageError = "Invalid username or password"
      throw new UnauthorizedError(mensageError)
    }

    const verifyPassWord = await comparePassword(password, user.password)

    if (!verifyPassWord) {
      const mensageError = "Invalid username or password"
      throw new UnauthorizedError(mensageError)
    }

    const token = signToken({sub: user.id});

    
    const sevenDayInMillisecond = 604800000 //7 dias em milesegundos
    const newExpiresAt = new Date(Date.now() + sevenDayInMillisecond);

    const refreshToken = await repo.session.create({
      data: {
        userId: user.id,
        isRevoked: false,
        expiresAt: newExpiresAt,
        createdAt: new Date(),
      }
    })
    
    return {
      token,
      refreshToken
    }


  }
}