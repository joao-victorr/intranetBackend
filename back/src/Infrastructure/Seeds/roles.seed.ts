import { exit } from 'node:process';
import type { PrismaClient } from '@prisma/client';
import { Roles } from "../../Domain/AccessControl/Roles/Roles";



export const seedRoles = async (repo: PrismaClient) => {
  console.info("[SEED] Starting the role registrations...");
  let errorOccurred = false;

  for (const key in Roles) {

    const roleData = Roles[key as keyof typeof Roles];
    console.info(`[SEED] Cadastrando a função: ${roleData.name}`);


    const foundPermissions = await repo.permission.findMany({
      where: {
        name: {
          in: roleData.permissions,
        },
      },
    });

    if (foundPermissions.length !== roleData.permissions.length) {
      console.error(`[SEED] Not all permissions found for role: ${roleData.name}`);
      errorOccurred = true;
    }

    await repo.role.upsert({
      where: { name: roleData.name },
      update: {},
      create: {
        name: roleData.name,
        description: roleData.description,
        RolePermissions: {
          create: foundPermissions.map((permission) => ({
            permissionId: permission.id
          }))
        }
      }
    });

  }

  if (errorOccurred) {
    console.error("[SEED] Algumas roles não foram criadas por falta de permissões.");
    exit(1);
  }
}