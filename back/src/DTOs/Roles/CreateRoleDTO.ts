import z from "zod";
import { DateZodValidator } from "../../Domain/Validators/DateZodValidator";


export const GetAllRolesReplySchema = z.array(z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(255).nullable(),
  permissions: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100),
    description: z.string().max(255).nullable()
  }))
}))

export type GetAllRolesReplyDTO = z.infer<typeof GetAllRolesReplySchema>;