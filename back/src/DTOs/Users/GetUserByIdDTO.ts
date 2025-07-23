
import { z } from "zod";
import { DateZodValidator } from "../../Domain/Validators/DateZodValidator";


export const GetUserByIdRequestSchema = z.object({
  id: z.string().uuid()
})

export type GetUserByIdRequestDTO = z.infer<typeof GetUserByIdRequestSchema>


export const GetUserByIdReplySchama = z.object({
  id: z.string().uuid(),
  name: z.string(),
  surname: z.string(),
  username: z.string(),
  birthDate: DateZodValidator
})

export type GetUserByIdReplyDTO = z.infer<typeof GetUserByIdReplySchama>;