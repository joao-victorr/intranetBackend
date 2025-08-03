// // src/Domain/Permissions/validatePermissions.ts
// import { repo } from "../../Infrastructure/Databases/Prisma/PrismaClient";
// import { listAllPermissions } from "./PermissionGroup";

// export async function validatePermissionsInDatabase() {
//   const dbPermissions = await repo.permission.findMany();
//   const expected = listAllPermissions();

//   const missing = expected.filter(p => !dbPermissions.some(d => d.name === p));

//   if (missing.length) {
//     console.warn('⚠️ Permissões ausentes no banco:', missing);
//   } else {
//     console.log('✅ Todas as permissões estão no banco!');
//   }
// }
