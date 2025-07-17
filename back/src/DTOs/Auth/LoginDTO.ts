import z from 'zod';


export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string()
})

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>

export const LoginReplySchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    username: z.string()
  })
});
export type LoginReplyDTO = z.infer<typeof LoginReplySchema>;