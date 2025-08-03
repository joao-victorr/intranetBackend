import { BadRequestError } from "../../../Domain/Errors/AppErrors";
import type { CreatePermissionReplyDTO, CreatePermissionRequestDTO } from "../../../DTOs/Permissions/CreatePermissionDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";

export class CreatePermissionService {
  async execute({name, description}: CreatePermissionRequestDTO ): Promise<CreatePermissionReplyDTO> {
    const permissionExists = await repo.permission.findUnique({
      where: { name },
    });

    if (permissionExists) {
      throw new BadRequestError("Permission already exists");
    }

    const permission = await repo.permission.create({
      data: {
        name,
        description,
      },
    });

    return permission;
    
  }
}