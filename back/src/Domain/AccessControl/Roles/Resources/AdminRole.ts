import { GlobalPermissions } from "../../Permissions/GlobalPermissions";
import { EditorRole } from "./EditorRole";


export const AdminRole = {
  name: "Admin",
  description: "A role for administrators with full access to the system.",
  permissions: [
    ...EditorRole.permissions,
    GlobalPermissions.users.assignPermissions.name,
  ]
}