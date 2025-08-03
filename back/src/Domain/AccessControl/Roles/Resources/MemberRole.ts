import { GlobalPermissions } from "../../Permissions/GlobalPermissions";


export const MemberRole = {
  name: "Member",
  description: "A role for users who can view resources but cannot modify them.",
  permissions: [
    GlobalPermissions.users.viewer.name,
    
  ]
}