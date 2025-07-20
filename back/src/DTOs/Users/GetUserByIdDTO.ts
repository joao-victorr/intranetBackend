
import { parseBirthDate } from "@Domain/Validators/BirthDate";
import { z } from "zod";


export const GetUserByIdRequestSchema = z.object({
  id: z.string()
})

export type GetUserByIdRequestDTO = z.infer<typeof GetUserByIdRequestSchema>


export const GetUserByIdReplySchama = z.object({
  id: z.string().uuid(),
  name: z.string(),
  surname: z.string(),
  username: z.string(),
  birthDate: parseBirthDate()
})

export type GetUserByIdReplyDTO = z.infer<typeof GetUserByIdReplySchama>;