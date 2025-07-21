
import { z } from "zod";


export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().uuid()
})

export type RefreshTokenRequestDTO = z.infer<typeof RefreshTokenRequestSchema>;

export const RefreshTokenReplySchema = z.object({
  token: z.string().jwt(),
  refreshToken: z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    expiresAt: z.date(),
    createdAt: z.date(),
    isRevoked: z.boolean()
  })
})

export type RefreshTokenReplyDTO = z.infer<typeof RefreshTokenReplySchema>;

