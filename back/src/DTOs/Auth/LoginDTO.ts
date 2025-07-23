import {z} from 'zod';
import { DateZodValidator } from '../../Domain/Validators/DateZodValidator';






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
    expiresAt: DateZodValidator,
    createdAt: DateZodValidator,
    isRevoked: z.boolean()
  })
});

export type LoginReplyDTO = z.infer<typeof LoginReplySchema>;