import z from "zod";
import { DateZodValidator } from "../../Domain/Validators/DateZodValidator";


export const CreatePermissionRequestSchama = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullish(),
})

export type CreatePermissionRequestDTO = z.infer<typeof CreatePermissionRequestSchama>;

export const CreatePermissionReplySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: DateZodValidator,
})

export type CreatePermissionReplyDTO = z.infer<typeof CreatePermissionReplySchema>;