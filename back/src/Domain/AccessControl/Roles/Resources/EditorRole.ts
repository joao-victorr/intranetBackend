import { GlobalPermissions } from "../../Permissions/GlobalPermissions";
import { ViewerRole } from "./ViewerRole";


export const EditorRole = {
  name: "Editor",
  description: "A role for users who can view and edit resources.",
  permissions: [
    ...ViewerRole.permissions,
    GlobalPermissions.users.update.name,
    GlobalPermissions.users.create.name,
    GlobalPermissions.users.assignRoles.name,
  ]
}