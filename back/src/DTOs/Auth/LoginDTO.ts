import {z} from 'zod';


export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string()
})

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>

export const LoginReplySchema = z.object({
  token: z.string(),
  refreshToken: z.object({
    id: z.uuid(),
    userId: z.uuid(),
    // expiresAt: z.string(),
    // createdAt: z.string(),
    isRevoked: z.boolean()
  })
});

export type LoginReplyDTO = z.infer<typeof LoginReplySchema>;