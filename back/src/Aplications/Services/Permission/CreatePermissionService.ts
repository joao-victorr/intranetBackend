
import type { GetAllPermissionDTO } from "../../../DTOs/Permissions/GetAllPermissionDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";

export class GetAllPermissionService {
  async execute(): Promise<GetAllPermissionDTO> {
    const permissions = await repo.permission.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
      },
    });

    return permissions;
  }
}