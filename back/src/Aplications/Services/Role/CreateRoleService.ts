import { BadRequestError } from "../../../Domain/Errors/AppErrors";
import type { CreateRoleReplyDTO, CreateRoleRequestDTO } from "../../../DTOs/Roles/CreateRoleDTO";
import { repo } from "../../../Infrastructure/Databases/Prisma/PrismaClient";


export class CreateRoleService {
  async execute({ name, description }: CreateRoleRequestDTO): Promise<CreateRoleReplyDTO> {

    const roleExists = await repo.role.findUnique({
      where: {
        name,
      }
    })

    if (roleExists) {
      throw new BadRequestError("Role already exists");
    }

    // Create role in the database
    const role = await repo.role.create({
      data: {
        name,
        description,
      }
    });

    // Return the created role
    return role;
    
  }
}