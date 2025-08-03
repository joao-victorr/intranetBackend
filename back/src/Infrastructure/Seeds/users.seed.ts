import type { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { GlobalPermissions } from '../../Domain/AccessControl/Permissions/GlobalPermissions';

export const createDefaultAdminUser = async (repo: PrismaClient) => {
  const count = await repo.user.count();
  if (count > 0) {
    console.log('[SEED] Usuário admin já existe.');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin', 10);

  const defaultUser = await repo.user.create({
    data: {
      name: 'TI',
      username: 'admin@gmail.com',
      password: hashedPassword,
      birthDate: new Date('2000-01-01'),
      sessionTimeoutInMiliseconds: 300000,
    },
  });

  console.log('[SEED] Usuário admin criado com sucesso.');

  const permissionsExists = await repo.permission.findUnique({
    where: { name: GlobalPermissions.admin.superadmin.name },
  })

  if (!permissionsExists) {
    console.log('[SEED] Permissões de superadmin não encontradas. Criando...');

    const permissions = await repo.permission.create({
      data: {
        name: GlobalPermissions.admin.superadmin.name,
        description: 'Permissões de superadmin',
      },
    });

    console.log('[SEED] Permissões de superadmin criadas com sucesso.');

    await repo.userPermission.create({
      data: {
        userId: defaultUser.id,
        permissionId: permissions.id,
      },
    });

    console.log('[SEED] Permissão de superadmin atribuída ao usuário admin.');
    return;
  }

  await repo.userPermission.create({
    data: {
      userId: defaultUser.id,
      permissionId: permissionsExists.id,
    },
  })

  console.log('[SEED] Permissão de superadmin atribuída ao usuário admin.');
};
