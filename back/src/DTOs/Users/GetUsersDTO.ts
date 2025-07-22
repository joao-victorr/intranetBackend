import { parseBirthDate } from "@Domain/Validators/BirthDate";
import { z } from "zod";


export const GetUsersReplySchema = z.array(z.object({
    id: z.uuid(),
    name: z.string(),
    surname: z.string(),
    username: z.string(),
    birthDate: parseBirthDate()
}))

export type GetUsersReplyDTO = z.infer<typeof GetUsersReplySchema>;