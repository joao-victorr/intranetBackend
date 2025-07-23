import z from "zod";


export const DeleteUserByIdRequestSchema = z.object({
  id: z.string().uuid()
})

export type DeleteUserByIdRequestDTO = z.infer<typeof DeleteUserByIdRequestSchema>;


export const DeleteUserByIdReplySchema = z.object({
  message: z.string()
})

export type DeleteUserByIdReplyDTO = z.infer<typeof DeleteUserByIdReplySchema>;