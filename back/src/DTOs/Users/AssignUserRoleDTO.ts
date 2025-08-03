import z from "zod";


export const AssignUserRolesRequestParamsSchema = z.object({
  userId: z.string().uuid(),
})
export type AssignUserRolesRequestParamsDTO = z.infer<typeof AssignUserRolesRequestParamsSchema>;


export const AssignUserRolesRequestBodySchema = z.object({
  roles: z.array(z.string().uuid()),
})
export type AssignUserRolesRequestBodyDTO = z.infer<typeof AssignUserRolesRequestBodySchema>;


export const AssignUserRolesRequestSchema = AssignUserRolesRequestParamsSchema.merge(AssignUserRolesRequestBodySchema);
export type AssignUserRolesRequestDTO = z.infer<typeof AssignUserRolesRequestSchema>;


export const AssignUserRoleReplySchema = z.object({
  userId: z.string().uuid(),
  roles: z.array(z.string().uuid()),
});
export type AssignUserRolesReplyDTO = z.infer<typeof AssignUserRoleReplySchema>;