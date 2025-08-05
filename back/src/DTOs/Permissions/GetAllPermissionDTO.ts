import z from "zod";
import { DateZodValidator } from "../../Domain/Validators/DateZodValidator";


export const GetAllPermissionSchema = z.array(z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullish(),
  createdAt: DateZodValidator,
}))

export type GetAllPermissionDTO = z.infer<typeof GetAllPermissionSchema>;