import { GlobalPermissions } from "../../Permissions/GlobalPermissions";


export const ViewerRole = {
  name: "Viewer",
  description: "A role for users who can view resources but cannot modify them.",
  permissions: [
    GlobalPermissions.users.viewer.name,
    GlobalPermissions.users.list.name,
    GlobalPermissions.roles.viewer.name,
    GlobalPermissions.permissions.viewer.name,
  ]
}