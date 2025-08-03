import { UnauthorizedError } from "../../../Domain/Errors/AppErrors";
import type { RefreshTokenReplyDTO } from "../../../DTOs/Auth/RefreshTokenDTO";
import { signToken } from "../../../Infrastructure/Auth/JWT";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class RefreshTokenService {
  async execute(refreshTokenID: string): Promise<RefreshTokenReplyDTO> {

    const session = await repo.session.findUnique({
      where: {
        id: refreshTokenID
      }
    });

    if (!session) {
      console.log(session)
      throw new UnauthorizedError("Refrash Token does not exist");
    }

    if (session.isRevoked) {
      throw new UnauthorizedError("Session has been revoked");
    }

    if (session.expiresAt <= new Date()) {
      throw new UnauthorizedError("Session has expired");
    }

    await repo.session.update({
      where: { id: session.id },
      data: { isRevoked: true }
    });

    const user = await repo.user.findUnique({
      where: { id: session.userId }
    })

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const userSessionTimeout = user.sessionTimeoutInMiliseconds

    const newExpiresAt = new Date(Date.now() + userSessionTimeout);

    const refreshToken = await repo.session.create({
      data: {
        userId: user.id,
        isRevoked: false,
        expiresAt: newExpiresAt,
        createdAt: new Date(),
      }
    })

    const token = signToken({ sub: session.userId });

    return { token, refreshToken};
  }
}