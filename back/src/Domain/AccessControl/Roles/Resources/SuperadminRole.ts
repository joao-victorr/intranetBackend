import { GlobalPermissions } from "../../Permissions/GlobalPermissions";
import { EditorRole } from "./EditorRole";


export const SuperadminRole = {
  name: "Superadmin",
  description: "A role for super administrators with full access to the system.",
  permissions: [
    GlobalPermissions.admin.superadmin.name,
  ]
}