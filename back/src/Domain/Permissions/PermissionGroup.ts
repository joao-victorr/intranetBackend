import { GlobalPermissions } from "./GlobalPermissions";

export type PermissionSeed = {
  name: string;
  description: string;
};

export const listAllPermissions = (): PermissionSeed[] => {
  const result: PermissionSeed[] = [];

  for (const group of Object.values(GlobalPermissions)) {
    for (const perm of Object.values(group)) {
      result.push({ name: perm.name, description: perm.description });
    }
  }

  return result;
};
