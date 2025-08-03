import { AdminRole } from "./Resources/AdminRole";
import { EditorRole } from "./Resources/EditorRole";
import { MemberRole } from "./Resources/MemberRole";
import { SuperadminRole } from "./Resources/SuperadminRole";
import { ViewerRole } from "./Resources/ViewerRole";

export const Roles = {
  superadmin: SuperadminRole,
  admin: AdminRole,
  editor: EditorRole,
  viewer: ViewerRole,
  member: MemberRole
} as const;
