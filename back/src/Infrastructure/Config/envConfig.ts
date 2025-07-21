import dotenv from "dotenv"
import { z } from "zod";

dotenv.config()

// Define o esquema esperado para as variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  DATABASE_URL: z.string()
});

// Faz o parse e valida as variáveis
const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error("❌ Variáveis de ambiente inválidas:", envParsed.error.format());
  process.exit(1); // Interrompe a execução da aplicação
}

// Exporta as variáveis validadas
export const EnvConfig = envParsed.data;
