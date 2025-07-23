
import { z } from "zod";
import { DateZodValidator } from "../../Domain/Validators/DateZodValidator";


export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().uuid()
})

export type RefreshTokenRequestDTO = z.infer<typeof RefreshTokenRequestSchema>;

export const RefreshTokenReplySchema = z.object({
  token: z.string().jwt(),
  refreshToken: z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    expiresAt: DateZodValidator,
    createdAt: DateZodValidator,
    isRevoked: z.boolean()
  })
})

export type RefreshTokenReplyDTO = z.infer<typeof RefreshTokenReplySchema>;

