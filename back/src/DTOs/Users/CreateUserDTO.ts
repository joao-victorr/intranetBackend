// import { parseBirthDate } from "@Domain/Validators/BirthDate";
import { parseBirthDate } from "@Domain/Validators/BirthDate";
import { z } from "zod";


export const CreateUserRequestSchema = z.object({
  name: z.string(),
  surname: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: parseBirthDate()
})

export type CreateUserRequestDTO = z.infer<typeof CreateUserRequestSchema>;



export const CreateUserReplySchema = z.object({
  id: z.string().uuid()
})

export type CreateUserReplyDTO = z.infer<typeof CreateUserReplySchema>;