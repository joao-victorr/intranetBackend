export const RolePermissions = {
  full: {
    name: "roles.full",
    description: "Permite todas as operações com papéis (roles).",
  },
  manager: {
    name: "roles.manager",
    description: "Gerencia papéis existentes.",
  },
  create: {
    name: "roles.create",
    description: "Pode criar novos papéis.",
  },
  assignPermissions: {
    name: "roles.assignPermissions",
    description: "Pode atribuir permissões a papéis.",
  },
} as const;
