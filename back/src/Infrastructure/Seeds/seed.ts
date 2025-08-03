import { PrismaClient } from '@prisma/client';
import { seedPermissions } from './permissions.seed';
import { createDefaultAdminUser } from './users.seed';

const prisma = new PrismaClient();



const main = async () => {

  await seedPermissions(prisma);
  await createDefaultAdminUser(prisma);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
