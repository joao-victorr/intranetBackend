import { z } from "zod";

export const CreateReplyGlobalSchema = z.object({
  id: z.uuid()
})

export type CreateReplyGlobalDTO = z.infer<typeof CreateReplyGlobalSchema>;