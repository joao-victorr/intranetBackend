import z from "zod";
import { DateZodValidator } from "../../Domain/Validators/DateZodValidator";


export const CreateRoleRequestSchama = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullish(),
})

export type CreateRoleRequestDTO = z.infer<typeof CreateRoleRequestSchama>;

export const CreateRoleReplySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: DateZodValidator,
})

export type CreateRoleReplyDTO = z.infer<typeof CreateRoleReplySchema>;