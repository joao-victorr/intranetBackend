import z from 'zod';


export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string()
})

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>

export const LoginReplySchema = z.object({
  token: z.string(),
  refreshToken: z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    expiresAt: z.coerce.string().datetime().transform((str) => String(str)), // <--- MUDANÇA AQUI
    createdAt: z.coerce.string().datetime().transform((str) => String(str)),
    isRevoked: z.boolean()
  })
});

export type LoginReplyDTO = z.infer<typeof LoginReplySchema>;