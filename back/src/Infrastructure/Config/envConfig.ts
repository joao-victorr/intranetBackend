import dotenv from "dotenv"
import { z } from "zod";

dotenv.config()

// Define o esquema esperado para as variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  DATABASE_URL: z.string(),
  URL: z.string().min(1, "URL_FRONT is required"), // Torna obrigatório em qualquer ambiente
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
}).superRefine((data, ctx) => {
  if (data.NODE_ENV === "production") {
    // Se estiver em produção, valida se é uma URL válida
    try {
      new URL(data.URL); // Tenta criar uma URL para validar o formato
    } catch (e) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "URL_FRONT must be a valid URL in production environment.",
        path: ["URL"],
      });
    }
  }
  // Em 'development' (ou qualquer outro ambiente que não seja 'production'),
  // ele já é obrigatório por causa do .min(1), mas não valida o formato de URL.
});

// Faz o parse e valida as variáveis
const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error("❌ Variáveis de ambiente inválidas:", envParsed.error.format());
  process.exit(1); // Interrompe a execução da aplicação
}

// Exporta as variáveis validadas
export const EnvConfig = envParsed.data;


// CLOUDINARY_CLOUD_NAME=dn4te44ha
// CLOUDINARY_API_KEY=143967692713356
// CLOUDINARY_API_SECRET=Hq5Z1_otU-1p9GCJQjYUuC3n0vo