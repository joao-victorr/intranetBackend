import * as bcrypt from 'bcrypt';

// --- Bcrypt para Hashing de Senhas (para senhas de usuários do seu SaaS) ---
const SALT_ROUNDS = 10; // Valor recomendado para bcrypt

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}