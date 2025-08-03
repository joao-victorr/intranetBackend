import { z } from "zod";
import { DateZodValidator } from "../../Domain/Validators/DateZodValidator";


export const GetUsersReplySchema = z.array(z.object({
  id: z.string().uuid(),
  name: z.string(),
  username: z.string(),
  birthDate: DateZodValidator,
  isDeleted: z.boolean(),
  deletedAt: DateZodValidator.nullable(),
  sessionTimeoutInMiliseconds: z.number().int().min(0),
}))

export type GetUsersReplyDTO = z.infer<typeof GetUsersReplySchema>;