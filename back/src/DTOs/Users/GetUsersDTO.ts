import { z } from "zod";
import { DateZodValidator } from "../../Domain/Validators/DateZodValidator";


export const GetUsersReplySchema = z.array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    surname: z.string(),
    username: z.string(),
    birthDate: DateZodValidator
}))

export type GetUsersReplyDTO = z.infer<typeof GetUsersReplySchema>;