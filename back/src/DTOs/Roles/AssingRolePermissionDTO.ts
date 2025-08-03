import z from "zod";


export const AssingRolePermissionsRequestParamsSchema = z.object({
  roleId: z.string().uuid(),
})
export type AssingRolePermissionsRequestParamsDTO = z.infer<typeof AssingRolePermissionsRequestParamsSchema>;


export const AssingRolePermissionsRequestBodySchema = z.object({
  permissions: z.array(z.string().uuid()),
})
export type AssingRolePermissionsRequestBodyDTO = z.infer<typeof AssingRolePermissionsRequestBodySchema>;


export const AssingRelePermissionsRequestSchema = AssingRolePermissionsRequestParamsSchema.merge(AssingRolePermissionsRequestBodySchema)
export type AssingRolePermissionsRequestDTO = z.infer<typeof AssingRelePermissionsRequestSchema>;


export const AssingRolePermissionsReplySchema = z.object({
  roleId: z.string().uuid(),
  permissions: z.array(z.string().uuid()),
})
export type AssingRolePermissionsReplyDTO = z.infer<typeof AssingRolePermissionsReplySchema>;