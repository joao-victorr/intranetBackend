// src/Domain/Permissions/Resources/index.ts

import { AdminPermissions } from "./Resources/admin.permission";
import { PermissionPermissions } from "./Resources/permissions.permision";
import { RolePermissions } from "./Resources/role.permission";
import { UserPermissions } from "./Resources/user.permission";


export const GlobalPermissions = {
  admin: AdminPermissions,
  users: UserPermissions,
  roles: RolePermissions,
  permissions: PermissionPermissions
} as const;

