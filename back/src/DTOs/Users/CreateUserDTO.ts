// import { parseBirthDate } from "@Domain/Validators/BirthDate";

import { z } from "zod";
import { DateZodValidator } from "../../Domain/Validators/DateZodValidator";


export const CreateUserRequestSchema = z.object({
  name: z.string(),
  surname: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: DateZodValidator,
  sessionTimeout: z.number().optional()
})

export type CreateUserRequestDTO = z.infer<typeof CreateUserRequestSchema>;



export const CreateUserReplySchema = z.object({
  id: z.string().uuid()
})

export type CreateUserReplyDTO = z.infer<typeof CreateUserReplySchema>;