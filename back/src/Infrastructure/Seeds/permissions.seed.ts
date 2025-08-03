// src/Infrastructure/Seeds/permissions.seed.ts

import type { PrismaClient } from "@prisma/client/extension";
import { listAllPermissions } from "../../Domain/AccessControl/Permissions/PermissionGroup";

export const seedPermissions = async (repo: PrismaClient) =>{

  for (const { name, description } of listAllPermissions()) {
  await repo.permission.upsert({
    where: { name },
    update: { description },
    create: { name, description },
  });
}

  console.log('[SEED] Permissões atualizadas no banco.');
}
