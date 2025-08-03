import z from "zod";


export const AssingUserPermissionsRequestParamsSchema = z.object({
  userId: z.string().uuid(),
})
export type AssingUserPermissionsRequestParamsDTO = z.infer<typeof AssingUserPermissionsRequestParamsSchema>;


export const AssingUserPermissionsRequestBodySchema = z.object({
  permissions: z.array(z.string().uuid()),
})
export type AssingUserPermissionsRequestBodyDTO = z.infer<typeof AssingUserPermissionsRequestBodySchema>;


export const AssingUserPermissionsRequestSchema = AssingUserPermissionsRequestParamsSchema.merge(AssingUserPermissionsRequestBodySchema)
export type AssingUserPermissionsRequestDTO = z.infer<typeof AssingUserPermissionsRequestSchema>;


export const AssingUserPermissionsReplySchema = z.object({
  userId: z.string().uuid(),
  permissions: z.array(z.string().uuid()),
})
export type AssingUserPermissionsReplyDTO = z.infer<typeof AssingUserPermissionsReplySchema>;