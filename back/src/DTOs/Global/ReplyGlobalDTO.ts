import { z } from "zod";

export const CreateReplyGlobalSchema = z.object({
  id: z.string().uuid()
})

export type CreateReplyGlobalDTO = z.infer<typeof CreateReplyGlobalSchema>;