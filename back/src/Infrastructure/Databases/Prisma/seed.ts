import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Verifica se o usuário admin já existe
  const existingUser = await prisma.user.count(); // ← `await` necessário

  if (existingUser !== 0) {
    console.log('Entre com o usuário existente.');
    return;
  }

  // Cria um usuário admin padrão
  const hashedPassword = await bcrypt.hash('admin', 10);
  const birthDate = new Date("01/01/2000");

  await prisma.user.create({
    data: {
      name: 'TI',
      surname: 'Admin',
      username: 'admin@gmail.com',
      password: hashedPassword,
      birthDate: birthDate,
      sessionTimeout: 300000 //5min
    },
  });

  console.log('Usuário admin criado com sucesso');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
