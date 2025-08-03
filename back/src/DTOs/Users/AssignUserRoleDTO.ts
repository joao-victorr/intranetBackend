import z from "zod";


export const AssignUserRolesRequestParamsSchema = z.object({
  userId: z.string().uuid(),
})
export type AssignUserRolesRequestParamsDTO = z.infer<typeof AssignUserRolesRequestParamsSchema>;


export const AssignUserRolesRequestBodySchema = z.object({
  roleId: z.string().uuid(),
})
export type AssignUserRolesRequestBodyDTO = z.infer<typeof AssignUserRolesRequestBodySchema>;


export const AssignUserRolesRequestSchema = AssignUserRolesRequestParamsSchema.merge(AssignUserRolesRequestBodySchema);
export type AssignUserRolesRequestDTO = z.infer<typeof AssignUserRolesRequestSchema>;


export const AssignUserRoleReplySchema = z.object({
  success: z.literal(true),
  message: z.string()
});
export type AssignUserRolesReplyDTO = z.infer<typeof AssignUserRoleReplySchema>;