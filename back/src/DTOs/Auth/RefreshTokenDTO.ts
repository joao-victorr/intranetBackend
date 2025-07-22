
import { z } from "zod";


export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.uuid()
})

export type RefreshTokenRequestDTO = z.infer<typeof RefreshTokenRequestSchema>;

export const RefreshTokenReplySchema = z.object({
  token: z.jwt(),
  refreshToken: z.object({
    id: z.uuid(),
    userId: z.uuid(),
    expiresAt: z.date(),
    createdAt: z.date(),
    isRevoked: z.boolean()
  })
})

export type RefreshTokenReplyDTO = z.infer<typeof RefreshTokenReplySchema>;

