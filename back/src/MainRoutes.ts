
import { AuthRoutes } from "./Aplications/Routes/AuthRoutes";
import { PermissionRoutes } from "./Aplications/Routes/PermissionRoutes";
import { RoleRoutes } from "./Aplications/Routes/RoleRoutes";
import { UsersRoutes } from "./Aplications/Routes/UsersRoutes";
import type { FastifyTypedInstance } from "./Types/Fastify";



export const MainRoutes = async (server: FastifyTypedInstance) => {
 await server.register(AuthRoutes, { prefix: "/api/auth" });
 await server.register(UsersRoutes, { prefix: "/api/users" });
 await server.register(PermissionRoutes, { prefix: "/api/permissions" });
 await server.register(RoleRoutes, { prefix: "/api/roles" });

}