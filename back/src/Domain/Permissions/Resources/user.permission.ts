

export const UserPermissions = {
  full: {
    name: "users.full",
    description: "Permite todas as operações com usuários.",
  },
  manager: {
    name: "users.manager",
    description: "Gerencia usuários (criar, editar, remover).",
  },
  list: {
    name: "users.list",
    description: "Pode visualizar a lista de usuários.",
  },
  create: {
    name: "users.create",
    description: "Pode criar novos usuários.",
  },
  read: {
    name: "users.read",
    description: "Pode visualizar detalhes de usuários.",
  },
  update: {
    name: "users.update",
    description: "Pode atualizar dados dos usuários.",
  },
  delete: {
    name: "users.delete",
    description: "Pode deletar usuários.",
  },
  assignRoles: {
    name: "users.assignRoles",
    description: "Pode atribuir funções aos usuários.",
  },
  assignPermissions: {
    name: "users.assignPermissions",
    description: "Pode atribuir permissões aos usuários.",
  },
} as const;
